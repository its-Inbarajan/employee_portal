import React from "react";
import * as THREE from "three";

export function useHelixCube(containerRef) {
  const rendererRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const stateRef = React.useRef({
    rotX: -0.4,
    rotY: 0.52,
    drag: { active: false, prevX: 0, prevY: 0, velX: 0, velY: 0 },
    autoSpin: true,
  });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Constants ──────────────────────────────────────────────────
    const ARM_R = 0.7;
    const ARM_HALF = 1.52;
    const SEGS = 48;
    const SENS = 0.008;
    const DAMPING = 0.88;

    // ── Renderer ───────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Scene & Camera ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 11);

    // ── Lights ─────────────────────────────────────────────────────
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(-3, 7, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x99bbff, 1.8);
    fillLight.position.set(6, 1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff88cc, 1.4);
    rimLight.position.set(1, -5, -5);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0xccccff, 0.7));

    // ── Shadow catcher ─────────────────────────────────────────────
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.15, transparent: true })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -3.4;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // ── Materials ──────────────────────────────────────────────────
    const blueMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x1212dd),
      metalness: 0.1,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
    });

    const makeIriMat = () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
        uniforms: { uTime: { value: 0.0 } },
        vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vPos;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vPos     = worldPos.xyz;
          vNormal  = normalize(mat3(modelMatrix) * normal);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
        fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vPos;
        vec3 iridescence(float t) {
          vec3 c0 = vec3(0.0,  0.85, 1.0);
          vec3 c1 = vec3(0.45, 0.0,  1.0);
          vec3 c2 = vec3(1.0,  0.15, 0.75);
          vec3 c3 = vec3(1.0,  0.85, 1.0);
          if (t < 0.333) return mix(c0, c1, t / 0.333);
          if (t < 0.666) return mix(c1, c2, (t - 0.333) / 0.333);
          return mix(c2, c3, (t - 0.666) / 0.334);
        }
        void main() {
          float fresnel = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
          fresnel = pow(fresnel, 3.2);
          float hue = fract(sin(vPos.x*0.4 + vPos.y*0.5 + vPos.z*0.3 + uTime*0.35)*43758.5453);
          vec3 col = iridescence(hue);
          gl_FragColor = vec4(col * fresnel * 1.1, fresnel * 0.9);
        }
      `,
      });

    // ── Geometry ───────────────────────────────────────────────────
    const cylGeo = new THREE.CylinderGeometry(
      ARM_R,
      ARM_R,
      ARM_HALF * 2,
      SEGS,
      1,
      false
    );
    const capGeo = new THREE.SphereGeometry(
      ARM_R,
      SEGS,
      24,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );

    const buildArm = (mat, iriMat) => {
      const g = new THREE.Group();

      const cyl = new THREE.Mesh(cylGeo, mat);
      cyl.castShadow = cyl.receiveShadow = true;
      g.add(cyl);

      const top = new THREE.Mesh(capGeo, mat);
      top.position.y = ARM_HALF;
      top.castShadow = top.receiveShadow = true;
      g.add(top);

      const bot = new THREE.Mesh(capGeo, mat);
      bot.position.y = -ARM_HALF;
      bot.rotation.x = Math.PI;
      bot.castShadow = bot.receiveShadow = true;
      g.add(bot);

      const iriG = new THREE.Group();
      iriG.scale.setScalar(1.009);
      [
        new THREE.Mesh(cylGeo, iriMat),
        new THREE.Mesh(capGeo, iriMat),
        new THREE.Mesh(capGeo, iriMat),
      ].forEach((m, i) => {
        if (i === 1) m.position.y = ARM_HALF;
        if (i === 2) {
          m.position.y = -ARM_HALF;
          m.rotation.x = Math.PI;
        }
        iriG.add(m);
      });
      g.add(iriG);
      return g;
    };

    const ARMS = [
      [0, 0],
      [Math.PI, 0],
      [0, Math.PI / 2],
      [0, -Math.PI / 2],
      [Math.PI / 2, 0],
      [-Math.PI / 2, 0],
    ];

    const crossGroup = new THREE.Group();
    scene.add(crossGroup);

    const iriMats = [];
    ARMS.forEach(([rx, rz]) => {
      const iriM = makeIriMat();
      iriMats.push(iriM);
      const arm = buildArm(blueMat, iriM);
      arm.rotation.x = rx;
      arm.rotation.z = rz;
      crossGroup.add(arm);
    });

    // ── Drag events ────────────────────────────────────────────────
    const s = stateRef.current;
    const el = renderer.domElement;

    const onPointerDown = (e) => {
      s.drag.active = true;
      s.drag.prevX = e.clientX;
      s.drag.prevY = e.clientY;
      s.drag.velX = s.drag.velY = 0;
      s.autoSpin = false;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!s.drag.active) return;
      s.drag.velY = (e.clientX - s.drag.prevX) * SENS;
      s.drag.velX = (e.clientY - s.drag.prevY) * SENS;
      s.rotY += s.drag.velY;
      s.rotX += s.drag.velX;
      s.drag.prevX = e.clientX;
      s.drag.prevY = e.clientY;
    };
    const onPointerUp = () => {
      s.drag.active = false;
    };

    // const onWheel = (e) => {
    //   camera.position.z = Math.max(
    //     5,
    //     Math.min(22, camera.position.z + e.deltaY * 0.012)
    //   );
    // };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    // el.addEventListener("wheel", onWheel, { passive: true });

    // ── Animation ──────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const qX = new THREE.Quaternion();
    const qY = new THREE.Quaternion();
    const axisX = new THREE.Vector3(1, 0, 0);
    const axisY = new THREE.Vector3(0, 1, 0);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (s.autoSpin) {
        s.rotY += 0.005;
        s.rotX += 0.001;
      } else if (!s.drag.active) {
        s.rotY += s.drag.velY;
        s.rotX += s.drag.velX;
        s.drag.velY *= DAMPING;
        s.drag.velX *= DAMPING;
      }

      qX.setFromAxisAngle(axisX, s.rotX);
      qY.setFromAxisAngle(axisY, s.rotY);
      crossGroup.rotation.x = s.rotX;
      crossGroup.rotation.y = s.rotY;
      crossGroup.quaternion.multiplyQuaternions(qY, qX);
      crossGroup.position.y = Math.sin(t * 0.7) * 0.09;

      iriMats.forEach((m) => {
        m.uniforms.uTime.value = t;
      });

      keyLight.position.x = Math.cos(t * 0.28) * 4 - 1;
      keyLight.position.z = Math.sin(t * 0.28) * 2 + 5;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      // el.removeEventListener("wheel", onWheel);

      // Dispose GPU resources
      cylGeo.dispose();
      capGeo.dispose();
      blueMat.dispose();
      iriMats.forEach((m) => m.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);
}
