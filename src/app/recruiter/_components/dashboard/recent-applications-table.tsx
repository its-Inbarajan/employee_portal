import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
interface ApplicantsTypes {
  candidate: {
    name: string;
    fallback: string;
  };
  role: string;
  score: number;
}

interface RecentApplicationsTableProps {
  applications: ApplicantsTypes[];
}

export default function RecentApplicationsTable({
  applications,
}: RecentApplicationsTableProps) {
  return (
    <Card className="pb-0  overflow-hidden">
      <CardHeader className="h-4 px-4">
        <CardDescription className="font-bold text-accent-foreground">
          Recent Applications
        </CardDescription>
        <CardAction>
          <Button variant={"outline"} size={"xs"}>
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table className="rounded-xl">
          <TableHeader className="bg-muted ">
            <TableRow>
              <TableHead className="text-muted-foreground text-sm text-start">
                Candidate
              </TableHead>
              <TableHead className="text-muted-foreground text-sm text-start">
                Role
              </TableHead>
              <TableHead className="text-muted-foreground text-sm text-start">
                Score
              </TableHead>
              <TableHead className="text-muted-foreground text-sm text-start">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((item) => (
              <TableRow key={item.candidate.name}>
                <TableCell className="font-medium text-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="ring ring-white/25">
                      <AvatarImage src="/next.svg" alt="@shadcn" className="" />
                      <AvatarFallback>{item.candidate.fallback}</AvatarFallback>
                    </Avatar>
                    <span>{item.candidate.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-start text-xs font-normal text-muted-foreground">
                  {item.role}
                </TableCell>
                <TableCell className="text-start">
                  <Progress value={item.score} className="h-1.5" />
                </TableCell>
                <TableCell className="text-start">
                  <Button
                    variant={"default"}
                    size={"xs"}
                    className="bg-blue-600 text-white hover:bg-blue-600/80"
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
