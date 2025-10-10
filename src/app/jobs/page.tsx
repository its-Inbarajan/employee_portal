import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      page <Link href={"/applied"}>Job id</Link>
    </div>
  );
};

export default page;
