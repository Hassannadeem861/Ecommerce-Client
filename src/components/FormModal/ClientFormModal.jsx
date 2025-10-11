// src/components/FormModal/FormModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import FormFields from "./ClientFormFields";
import { Button } from "../ui/button";

export default function FormModal({ isOpen, onClose, onSubmit, initialData }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      email: "",
      mobile_number: "",
      designation: "",
      account_number: "",
      permanent_address: "",
      salary: "",
      date_of_birth: "",
      date_of_joining: "",
      status: "1",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        status: initialData?.status === 1 ? "1" : "0",
      });
    } else {
      reset({
        name: "",
        email: "",
        mobile_number: "",
        designation: "",
        account_number: "",
        permanent_address: "",
        salary: "",
        date_of_birth: "",
        date_of_joining: "",
        status: "1",
      });
    }
  }, [initialData, reset]);

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
    const formData = new FormData();

    // ✅ Sab fields append kar rahe hain
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile_number", data.mobile_number);
    formData.append("designation", data.designation);
    formData.append("account_number", data.account_number);
    formData.append("permanent_address", data.permanent_address);
    formData.append("salary", data.salary);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("date_of_joining", data.date_of_joining);
    formData.append("status", data.status);

    // ✅ File sirf agar naye di ho to
    if (data.fileUpload instanceof File) {
      formData.append("fileUpload", data.fileUpload);
    }

    if (data.pdfUpload instanceof File) {
      formData.append("pdfUpload", data.pdfUpload);
    }

    // ✅ Debug: show all form data entries
    for (let pair of formData.entries()) {
      // console.log(pair[0] + ": " + pair[1]);
    }

    // ✅ Call update ya create
    if (initialData?._id) {
      // EDIT mode
      await onSubmit(initialData._id, formData); // <-- _id pass karo
    } else {
      // ADD mode
      await onSubmit(formData);
    }

    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Item" : "Create New Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormFields control={control} />
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
