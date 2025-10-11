import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "../ui/switch"; // for award
import { MultiSelect } from "../../components/multi-select.jsx"; // MultiSelect component
import { getAllProjects } from "../../utils/project-award-api.js";

export default function FormFields({ control }) {
  const [stackOptions, setStackOptions] = useState([]);
  const [nicheOptions, setNicheOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProjects();
      // console.log("Get all projects: ", data?.projects);

      const allStacks = [];
      const allNiches = [];

      data?.projects?.forEach((project) => {
        if (Array.isArray(project.projectStack)) {
          allStacks.push(...project.projectStack);
        }
        if (Array.isArray(project.projectNiche)) {
          allNiches.push(...project.projectNiche);
        }
      });

      // Remove duplicates
      const uniqueStacks = [...new Set(allStacks)];
      const uniqueNiches = [...new Set(allNiches)];

      // Format for MultiSelect
      setStackOptions(
        uniqueStacks.map((item) => ({
          label: item,
          value: item.toLowerCase(),
        }))
      );

      setNicheOptions(
        uniqueNiches.map((item) => ({
          label: item,
          value: item.toLowerCase(),
        }))
      );
    } catch (error) {
      console.error("Error loading project options:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4 py-4">
     
      {/* Project Name */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="projectName" className="text-right">
          Project Name
        </Label>
        <Controller
          name="projectName"
          control={control}
          rules={{ required: "Project name is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="projectName" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Description */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="projectDescription" className="text-right">
          Description
        </Label>
        <Controller
          name="projectDescription"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Textarea id="projectDescription" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Budget */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="budget" className="text-right">
          Budget
        </Label>
        <Controller
          name="budget"
          control={control}
          rules={{ required: "Budget is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="budget" type="number" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* ✅ Tech Stack (Reusable MultiSelect with dynamic data) */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="projectStack" className="text-right">
          Tech Stack
        </Label>
        <Controller
          name="projectStack"
          control={control}
          rules={{ required: "Please select at least one stack" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <MultiSelect
                options={stackOptions}
                selected={field.value}
                onChange={field.onChange}
                placeholder="Select tech stack"
              />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* ✅ Project Niche (Reusable MultiSelect with dynamic data) */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="projectNiche" className="text-right">
          Project Niche
        </Label>
        <Controller
          name="projectNiche"
          control={control}
          rules={{ required: "Project niche is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="projectNiche" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Notes */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="text-right">
          Notes
        </Label>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <div className="col-span-3">
              <Textarea id="notes" {...field} />
            </div>
          )}
        />
      </div>

      {/* Award */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="award" className="text-right">
          Award
        </Label>
        <Controller
          name="award"
          control={control}
          render={({ field }) => (
            <div className="col-span-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={field.value === 1}
                  onCheckedChange={(val) => field.onChange(val ? 1 : 0)}
                />
                <span>{field.value === 1 ? "Active" : "Inactive"}</span>
              </div>
            </div>
          )}
        />
      </div>

      
    </div>
  );
}
