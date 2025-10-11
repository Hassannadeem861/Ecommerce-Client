// src/components/FormModal/FormModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import FormFields from "./ExpenceFormField.jsx";
import { Button } from "../ui/button";

export default function FormModal({ isOpen, onClose, onSubmit, initialData }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      date: "",
      reason: "",
      amount: "",
      type: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
      });
    } else {
      reset({
        date: "",
        reason: "",
        amount: "",
        type: "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    // Normally use data directly as object
    if (initialData?._id) {
      // Edit Mode
      await onSubmit(initialData._id, data);
    } else {
      // Add Mode
      await onSubmit(data);
    }

    reset(); // Reset after submit
    onClose(); // Close modal
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
