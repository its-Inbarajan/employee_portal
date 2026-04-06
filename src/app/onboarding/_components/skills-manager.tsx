"use client";

import { useForm, useFieldArray, UseFieldArrayReturn } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/field";
import { SkillsAndResumeInfoFormValues } from "@/schema/candidate-onboarding-schema";

// Types
type Skill = {
  skill_name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  yearsOfExp: number;
};

type FormValues = {
  skills: Skill[];
};

interface SkillManagerProps {
  skillArrayField?: UseFieldArrayReturn<SkillsAndResumeInfoFormValues>;
}

export function SkillManager({ skillArrayField }: SkillManagerProps) {
  const { control } = useForm<FormValues>({
    defaultValues: { skills: [] },
  });

  // const {append,  } = skillArrayField

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // Local state for the "Staging" inputs
  const [tempSkill, setTempSkill] = React.useState<Skill>({
    skill_name: "",
    level: "BEGINNER",
    yearsOfExp: 0,
  });

  const addSkill = () => {
    if (!tempSkill.skill_name) return; // Add Zod validation here if needed

    append(tempSkill); // Push to RHF state

    // Reset staging area
    setTempSkill({ skill_name: "", level: "BEGINNER", yearsOfExp: 0 });
  };

  // Helper for Badge Colors
  const getLevelColor = (level: string) => {
    if (level === "EXPERT") return "bg-purple-500 hover:bg-purple-600";
    if (level === "INTERMEDIATE") return "bg-blue-500 hover:bg-blue-600";
    return "bg-slate-500 hover:bg-slate-600";
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* 1. THE BADGE LIST (The "Upside" Map) */}
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-lg bg-muted/30">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No skills added yet...
          </p>
        )}
        {fields.map((field, index) => (
          <Badge
            key={field.id}
            className={cn(
              "pl-3 pr-1 py-1 gap-2 flex items-center animate-in zoom-in-95",
              getLevelColor(field.level),
            )}
          >
            <span className="font-semibold text-xs">
              {field.skill_name} • {field.yearsOfExp}yrs
            </span>
            <button
              onClick={() => remove(index)}
              className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center border p-6 rounded-xl bg-card shadow-sm">
        <Field>
          <Input
            value={tempSkill.skill_name}
            onChange={(e) =>
              setTempSkill({ ...tempSkill, skill_name: e.target.value })
            }
            placeholder="e.g. React, Marketing"
          />
        </Field>
        <Field>
          <Input
            type="number"
            placeholder="Years of Exprience"
            value={tempSkill.yearsOfExp}
            onChange={(e) =>
              setTempSkill({
                ...tempSkill,
                yearsOfExp: parseInt(e.target.value) || Number(""),
              })
            }
          />
        </Field>
        <Field>
          <Select
            value={tempSkill.level}
            onValueChange={(val: "BEGINNER" | "INTERMEDIATE" | "EXPERT") =>
              setTempSkill({ ...tempSkill, level: val })
            }
          >
            <SelectTrigger id="level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="EXPERT">Expert</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <Button
            type="button"
            onClick={addSkill}
            className="w-full gap-2 "
            variant="secondary"
            size={"sm"}
          >
            <Plus className="w-4 h-4" /> Add
          </Button>
        </Field>
      </div>
    </div>
  );
}
