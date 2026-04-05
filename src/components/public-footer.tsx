import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <div className="relative overflow-hidden border-t">
      <div className="mx-auto md:max-w-7xl max-w-full px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          <div className="col-span-4">
            <div className="flex flex-col gap-8">
              <h1 className="text-4xl font-bold tracking-tight text-balance">
                The Findmyjob
              </h1>
              <p className="font-normal text-xs text-muted-foreground leading-relaxed tracking-tight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                at ducimus tempora eveniet nobis accusamus reiciendis optio quas
                aut, facere, voluptate corrupti assumenda fuga, repellat
                officiis. Vero excepturi assumenda pariatur.
              </p>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-8 items-start">
              <p className="capitalize tracking-tight text-2xl font-semibold">
                Platform
              </p>
              <ul className="flex flex-col gap-1.5 items-start">
                {["browse jobs", "career advisor", "partnership"].map((job) => (
                  <li
                    className=" list-none inline-block"
                    key={`job-list-${job}`}
                  >
                    <Link
                      className="text-xs capitalize text-muted-foreground tracking-tight"
                      href={"/#"}
                    >
                      {job}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-8 items-start">
              <p className="capitalize tracking-tight text-2xl font-semibold">
                enterprise
              </p>
              <ul className="flex flex-col gap-1.5 items-start">
                {[
                  "talent strategy",
                  "hiring solutions",
                  "enterprise pricing",
                ].map((job) => (
                  <li
                    className=" list-none inline-block"
                    key={`job-list-${job}`}
                  >
                    <Link
                      className="text-xs capitalize text-muted-foreground tracking-tight"
                      href={"/#"}
                    >
                      {job}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-8 items-start">
              <p className="capitalize tracking-tight text-2xl font-semibold">
                connect
              </p>
              <ul className="flex flex-col gap-1.5 items-start">
                {["contact us", "linkedin", "newsletter"].map((job) => (
                  <li
                    className=" list-none inline-block"
                    key={`job-list-${job}`}
                  >
                    <Link
                      className="text-xs capitalize text-muted-foreground tracking-tight"
                      href={"/#"}
                    >
                      {job}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row  gap-4 border-t border-white/10 px-6 py-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-accent-foreground">
          © {new Date().getFullYear()} FindJob. All rights reserved.
        </p>
        <div className="flex flex-row items-center gap-6">
          <Button
            variant={"link"}
            size={"sm"}
            className="text-muted-foreground text-xs font-normal leading-5 tracking-wide"
          >
            PRIVACY
          </Button>
          <Button
            variant={"link"}
            size={"sm"}
            className="text-muted-foreground text-xs font-normal leading-5 tracking-wide"
          >
            TERMS
          </Button>
        </div>
      </div>
    </div>
  );
}
