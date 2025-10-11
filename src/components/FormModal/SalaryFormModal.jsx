// src/components/FormModal/FormModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import FormFields from "./SalaryFormFields.jsx";
import { Button } from "../ui/button";
export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  employers,
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      employerId: "",
      month: "",
    },
  });

  // useEffect(() => {
  //   if (initialData) {
  //     reset({
  //       ...initialData,
  //       status: initialData?.status === 1 ? "1" : "0",
  //     });
  //   } else {
  //     reset({
  //       name: "",
  //       email: "",
  //       mobile_number: "",
  //       designation: "",
  //       account_number: "",
  //       permanent_address: "",
  //       salary: "",
  //       date_of_birth: "",
  //       date_of_joining: "",
  //       status: "1",
  //     });
  //   }
  // }, [initialData, reset]);

  // const handleFormSubmit = async (data) => {

  //     const formData = new FormData();

  //   const payload = {
  //     name: data.name,
  //     email: data.email,
  //     mobile_number: data.mobile_number,
  //     designation: data.designation,
  //     account_number: data.account_number,
  //     permanent_address: data.permanent_address,
  //     salary: data.salary,
  //     date_of_birth: data.date_of_birth,
  //     date_of_joining: data.date_of_joining,
  //     status: data.status === "active" ? 1 : 0,
  //   };

  //    // Append files (check if provided)
  // if (data.fileUpload) {
  //   formData.append("fileUpload", data.fileUpload);
  // }
  // if (data.pdfUpload) {
  //   formData.append("pdfUpload", data.pdfUpload);
  // }

  //   await onSubmit(payload);
  //   reset();
  // };

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.log("Error in Handle form submit function :", error.message);
      
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Salary Slip" : "Create Salary Slip"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormFields control={control} employers={employers} />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
