import React from "react";

export default async function SingleJobList({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className="px-4 py-4">
      <div className=""></div>
    </div>
  );
}
