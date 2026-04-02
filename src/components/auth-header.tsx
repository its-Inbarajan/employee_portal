import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthHeader() {
  return (
    <nav className="md:px-6 px-4">
      <Link href={"/"} prefetch>
        <Image
          src={"/next.svg"}
          alt={"logo"}
          className="w-12 h-12  dark:brightness-75 dark:contrast-125 dark:invert object-fill object-center"
          loading="lazy"
          width={50}
          height={50}
        />
      </Link>
    </nav>
  );
}
