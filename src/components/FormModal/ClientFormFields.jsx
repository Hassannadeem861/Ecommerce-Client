// src/components/FormModal/FormFields.jsx
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
import { cn } from "@/lib/utils";


export default function FormFields({ control }) {
  return (
    <div className="grid gap-4 py-4">
      {/* Name */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="name" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Email */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="email" type="email" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Mobile Number */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="mobile_number" className="text-right">
          Mobile Number
        </Label>
        <Controller
          name="mobile_number"
          control={control}
          rules={{ required: "Mobile number is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="mobile_number" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Designation */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="designation" className="text-right">
          Designation
        </Label>
        <Controller
          name="designation"
          control={control}
          rules={{ required: "Designation is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="designation" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Account Number */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="account_number" className="text-right">
          Account Number
        </Label>
        <Controller
          name="account_number"
          control={control}
          rules={{ required: "Account number is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="account_number" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Salary */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="salary" className="text-right">
          Salary
        </Label>
        <Controller
          name="salary"
          control={control}
          rules={{ required: "Salary is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="salary" type="number" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Date of Birth */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date_of_birth" className="text-right">
          Date of Birth
        </Label>
        <Controller
          name="date_of_birth"
          control={control}
          rules={{ required: "Date of birth is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="date_of_birth" type="date" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Date of Joining */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date_of_joining" className="text-right">
          Date of Joining
        </Label>
        <Controller
          name="date_of_joining"
          control={control}
          rules={{ required: "Date of joining is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="date_of_joining" type="date" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Address (Permanent Address) */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="permanent_address" className="text-right">
          Permanent Address
        </Label>
        <Controller
          name="permanent_address"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Textarea id="permanent_address" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* File Upload */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fileUpload" className="text-right">
          Upload File
        </Label>
        <Controller
          name="fileUpload"
          control={control}
          rules={{ required: "File is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input
                type="file"
                id="fileUpload"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={cn(fieldState.error && "border-red-500")}
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

      {/* PDF Upload */}
      <div className="grid grid-cols-4 items-center gap-4 mt-4">
        <Label htmlFor="pdfUpload" className="text-right">
          Upload PDF
        </Label>
        <Controller
          name="pdfUpload"
          control={control}
          rules={{ required: "PDF is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input
                type="file"
                accept="application/pdf"
                id="pdfUpload"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={cn(fieldState.error && "border-red-500")}
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

      {/* Status */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </div>
  );
}
