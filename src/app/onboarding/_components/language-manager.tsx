import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingStore } from "@/features/candidate-onboarding-store";
import { cn } from "@/lib/utils";
import { SkillsAndResumeInfoFormValues } from "@/schema/candidate-onboarding-schema";
import { Plus, X } from "lucide-react";
import React from "react";
import { UseFieldArrayReturn } from "react-hook-form";

interface ILanguages {
  language: string;
  proficiency: "BASIC" | "CONVERSATIONAL" | "PROFESSIONAL" | "NATIVE";
}

interface SkillManagerProps {
  langugageArrayField?: UseFieldArrayReturn<SkillsAndResumeInfoFormValues>;
}

export default function LanguageManager({
  langugageArrayField,
}: SkillManagerProps) {
  const { languages, addLanguages, removeLanguages } = useOnboardingStore(
    (state) => state,
  );
  const [tempLangugae, setTempLanguage] = React.useState<ILanguages>({
    language: "",
    proficiency: "BASIC",
  });

  const addLanguage = () => {
    if (!tempLangugae.language) return; // Add Zod validation here if needed

    langugageArrayField?.append({
      language: tempLangugae.language,
      proficiency: tempLangugae.proficiency,
    });
    addLanguages(tempLangugae);
    // Reset staging area
    setTempLanguage({ language: "", proficiency: "BASIC" });
  };

  const getLevelColor = (proficiency: string) => {
    if (proficiency === "BASIC") return "bg-purple-500 hover:bg-purple-600";
    if (proficiency === "CONVERSATIONAL")
      return "bg-blue-500 hover:bg-blue-600";
    return "bg-slate-500 hover:bg-slate-600";
  };

  const handleRemoveSkills = (languageToRemove: string, index: number) => {
    if (!languageToRemove.trim()) return;
    removeLanguages(languageToRemove);
    // setFields((prev) => {
    //   // 2. Rename the parameter in filter to 'i' or 'idx'
    //   const filtered = prev.filter((_, idx) => idx !== languageToRemove);
    //   return filtered;
    // });
    langugageArrayField?.remove(index);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-wrap flex-col gap-2  p-2 border rounded-lg bg-muted/30">
        {languages.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No skills added yet...
          </p>
        )}
        {languages.map(
          (field, index) =>
            field.language && (
              <Badge
                key={`${index}-langugage-${field.language}`}
                className={cn(
                  "pl-3 pr-1 py-1 gap-2 flex items-center animate-in zoom-in-95",
                  getLevelColor(field.proficiency),
                )}
              >
                <span className="font-semibold text-xs">{field.language}</span>
                <button
                  onClick={() => handleRemoveSkills(field.language, index)}
                  className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ),
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center border bg-card p-2.5 rounded-xl shadow-sm">
          <Field>
            <Input
              value={tempLangugae.language}
              onChange={(e) =>
                setTempLanguage((pre) => ({
                  ...pre,
                  language: e.target.value,
                }))
              }
              name="language"
              placeholder="e.g. English, Spain, Tamil"
            />
          </Field>

          <Field>
            <Select
              value={tempLangugae.proficiency}
              onValueChange={(
                val: "BASIC" | "CONVERSATIONAL" | "PROFESSIONAL" | "NATIVE",
              ) => setTempLanguage({ ...tempLangugae, proficiency: val })}
            >
              <SelectTrigger id="level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                {["BASIC", "CONVERSATIONAL", "PROFESSIONAL", "NATIVE"].map(
                  (item) => (
                    <SelectItem key={`proficiency-${item}`} value={item}>
                      {item}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <Button
              type="button"
              onClick={addLanguage}
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
