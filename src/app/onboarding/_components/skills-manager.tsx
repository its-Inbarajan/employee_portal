"use client";

import { UseFieldArrayReturn } from "react-hook-form";
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
import { useOnboardingStore } from "@/features/candidate-onboarding-store";

// Types
type Skill = {
  skill_name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  yearsOfExp: number | string;
};

interface SkillManagerProps {
  skillArrayField?: UseFieldArrayReturn<SkillsAndResumeInfoFormValues>;
}

export function SkillManager({ skillArrayField }: SkillManagerProps) {
  // Local state for the "Staging" inputs
  const [tempSkill, setTempSkill] = React.useState<Skill>({
    skill_name: "",
    level: "BEGINNER",
    yearsOfExp: "",
  });

  const addSkills = useOnboardingStore((state) => state.addSkills);
  const removeSkills = useOnboardingStore((state) => state.removeSkills);
  const addedSkills = useOnboardingStore((state) => state.skills);

  const addSkill = () => {
    if (!tempSkill.skill_name) return; // Add Zod validation here if needed

    skillArrayField?.append({
      name: tempSkill.skill_name,
      level: tempSkill.level,
      yearsOfExp: Number(tempSkill.yearsOfExp),
    }); // Push to RHF state
    addSkills(tempSkill);
    // Reset staging area
    setTempSkill({
      skill_name: "",
      level: "BEGINNER",
      yearsOfExp: Number(""),
    });
  };

  // Helper for Badge Colors
  const getLevelColor = (level: string) => {
    if (level === "EXPERT") return "bg-purple-500 hover:bg-purple-600";
    if (level === "INTERMEDIATE") return "bg-blue-500 hover:bg-blue-600";
    return "bg-slate-500 hover:bg-slate-600";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setTempSkill((pre) => ({
      ...pre,
      [name]:
        type === "number" ? parseInt(e.target.value) || Number("") : value,
    }));
  };

  const handleRemoveSkills = (skillName: string, indexToRemove: number) => {
    if (indexToRemove < 0) return;
    removeSkills(skillName);
    // setFields((prev) => {
    //   // 2. Rename the parameter in filter to 'i' or 'idx'
    //   const filtered = prev.filter((_, idx) => idx !== indexToRemove);
    //   return filtered;
    // });
    skillArrayField?.remove(indexToRemove);
  };
  return (
    <div className="space-y-6 w-full ">
      {/* 1. THE BADGE LIST (The "Upside" Map) */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-muted/30">
        {addedSkills.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No skills added yet...
          </p>
        )}
        {addedSkills.map(
          (field, index) =>
            field.skill_name && (
              <Badge
                key={`${index}-skill-${field.skill_name}`}
                className={cn(
                  "pl-3 pr-1 py-1 gap-2 flex items-center animate-in zoom-in-95",
                  getLevelColor(field.level),
                )}
              >
                <span className="font-semibold text-xs">
                  {field.skill_name} • {field.yearsOfExp}yrs
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkills(field.skill_name, index)}
                  className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ),
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full items-center border p-2.5 rounded-xl bg-card shadow-sm">
          <Field>
            <Input
              value={tempSkill.skill_name}
              onChange={handleInputChange}
              name="skill_name"
              placeholder="e.g. React, Marketing"
            />
          </Field>
          <Field>
            <Input
              type="number"
              placeholder="Years of Exprience"
              value={tempSkill.yearsOfExp}
              name="yearsOfExp"
              onChange={handleInputChange}
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
    </div>
  );
}
