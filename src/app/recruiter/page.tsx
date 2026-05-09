import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PickaxeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RecruiterPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PickaxeIcon />
          </EmptyMedia>
          <EmptyTitle>Working in Progress</EmptyTitle>
          <EmptyDescription>
            You can skip this step and start explore dashboard and profile.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button type="button" variant={"default"} size={"lg"} asChild>
            <Link prefetch href={"/"}>
              Go Back
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
