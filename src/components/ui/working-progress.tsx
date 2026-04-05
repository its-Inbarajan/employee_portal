import React from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Loader2, PickaxeIcon } from "lucide-react";

interface Props {
  handleSkip: () => void;
  loading?: boolean;
}

export default function workingProgress({ handleSkip, loading }: Props) {
  return (
    <div>
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
          <Button
            type="button"
            onClick={handleSkip}
            variant={"default"}
            size={"lg"}
          >
            {loading ? (
              <Loader2 className="inline-block animate-spin" />
            ) : (
              "skip"
            )}
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
