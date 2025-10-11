import { useState } from "react";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export default function FormFields({ control, employers = [] }) {
  const [selectedSalary, setSelectedSalary] = useState("");

  return (
    <div className="grid gap-4 py-4">
      {/* Employer Dropdown */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="employerId" className="text-right">
          Employer
        </Label>
        <Controller
          name="employerId"
          control={control}
          rules={{ required: "Employer is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const selected = employers.find((emp) => emp._id === value);
                  console.log("selected salary value: ", value);
                  console.log("selected salary value: ", selected);

                  setSelectedSalary(selected?.salary || "");
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employer" />
                </SelectTrigger>
                <SelectContent>
                  {employers.map((emp) => (
                    <SelectItem key={emp._id} value={emp._id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Salary Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="salary" className="text-right">
          Salary
        </Label>
        <div className="col-span-3">
          <Input
            id="salary"
            type="text"
            value={selectedSalary}
            readOnly
            className="bg-muted cursor-not-allowed"
          />
        </div>
      </div>

      {/* Month Field */}

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="month" className="text-right">
          Month
        </Label>
        <Controller
          name="month"
          control={control}
          rules={{ required: "Month is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="month" type="month" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      
    </div>
  );
}
