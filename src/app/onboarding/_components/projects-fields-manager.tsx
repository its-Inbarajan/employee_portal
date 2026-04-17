import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SkillsAndResumeInfoFormValues } from "@/schema/candidate-onboarding-schema";
import { Plus, X } from "lucide-react";
import React from "react";
import { UseFieldArrayReturn } from "react-hook-form";
interface SkillManagerProps {
  projectsArrayField?: UseFieldArrayReturn<SkillsAndResumeInfoFormValues>;
}

interface Projects {
  description: string;
  endDate: string;
  repoUrl: string;
  startDate: string;
  title: string;
  url: string;
}

export default function ProjectsManager({
  projectsArrayField,
}: SkillManagerProps) {
  const [fields, setFields] = React.useState<Projects[]>([
    {
      description: "",
      endDate: "",
      repoUrl: "",
      startDate: "",
      title: "",
      url: "",
    },
  ]);
  const [tempProjects, setProjects] = React.useState<Projects>({
    description: "",
    endDate: "",
    repoUrl: "",
    startDate: "",
    title: "",
    url: "",
  });

  const addProjects = () => {
    if (!tempProjects.title) return; // Add Zod validation here if needed

    projectsArrayField?.append(tempProjects); // Push to RHF state
    setFields((pre) => [...pre, tempProjects]);
    // Reset staging area
    setProjects({
      description: "",
      endDate: "",
      repoUrl: "",
      startDate: "",
      title: "",
      url: "",
    });
  };

  const handleRemoveSkills = (indexToRemove: number) => {
    if (indexToRemove < 0) return;

    setFields((prev) => {
      // 2. Rename the parameter in filter to 'i' or 'idx'
      const filtered = prev.filter((_, idx) => idx !== indexToRemove);
      return filtered;
    });
    projectsArrayField?.remove(indexToRemove);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setProjects((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-muted/30">
        {fields.map(
          (field, index) =>
            field.title && (
              <Badge
                key={`${index}-skill-${field.title}`}
                className={
                  "pl-3 pr-1 py-1 gap-2 flex items-center animate-in zoom-in-95"
                }
              >
                <span className="font-semibold text-xs">{field.title}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkills(index)}
                  className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ),
        )}
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="grid grid-cols-2 w-full gap-2">
            <Field>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="project title"
                value={tempProjects.title}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Input
                type="url"
                name="url"
                id="url"
                placeholder="project url"
                value={tempProjects.url}
                onChange={handleInputChange}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 w-full gap-2">
            <Field>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                placeholder="project start date"
                value={tempProjects.startDate}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                placeholder="project end date"
                value={tempProjects.endDate}
                onChange={handleInputChange}
              />
            </Field>
          </div>
          <Field className="col-span-4">
            <Textarea
              name="description"
              id="description"
              placeholder="project description"
              value={tempProjects.description}
              onChange={handleInputChange}
            />
          </Field>
          <Field className="col-span-4">
            <Button
              type="button"
              onClick={addProjects}
              variant={"outline"}
              size={"lg"}
            >
              <Plus /> Add
            </Button>
          </Field>
        </div>
      </div>
    </div>
  );
}
