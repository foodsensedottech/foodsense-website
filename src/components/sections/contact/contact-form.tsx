"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  ContactFormData,
  DeliveryPartner,
} from "@/lib/validation/contact-schema";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import { formatPhoneNumber, parsePhoneNumber } from "@/lib/utils/format-phone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxGroup } from "@/components/ui/form/checkbox-group";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { useServices } from "@/hooks/use-services";
import { useToast } from "@/components/providers/toast-provider";

// Options from your preview
const RESTAURANT_TYPES = [
  { label: "Dine In", value: "dine_in" },
  { label: "Fast Casual", value: "fast_casual" },
  { label: "Quick Service", value: "quick_service" },
  { label: "Ghost Kitchen", value: "ghost_kitchen" },
  { label: "Food Truck", value: "food_truck" },
  { label: "Other", value: "other" },
];

const POS_SYSTEMS = [
  { label: "Toast", value: "toast" },
  { label: "Clover", value: "clover" },
  { label: "Square", value: "square" },
  { label: "LightSpeed", value: "lightspeed" },
  { label: "SpotOn", value: "spoton" },
  { label: "QuPOS", value: "qupos" },
  { label: "Aloha", value: "aloha" },
  { label: "Xenial", value: "xenial" },
  { label: "PAR", value: "par" },
  { label: "NCR", value: "ncr" },
  { label: "Oracle", value: "oracle" },
  { label: "Other", value: "other" },
];

const DELIVERY_PARTNERS: Array<{ label: string; value: DeliveryPartner }> = [
  { label: "UberEats", value: "ubereats" },
  { label: "DoorDash", value: "doordash" },
  { label: "GrubHub", value: "grubhub" },
  { label: "Postmates", value: "postmates" },
  { label: "Other", value: "other" },
];

export function ContactForm() {
  const { services, isLoading: isLoadingServices } = useServices();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setValue,
    watch,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      restaurant: "",
      numberOfLocations: 1,
      monthlyOrders: 0,
      restaurantType: "" as ContactFormData["restaurantType"],
      posSystem: "" as ContactFormData["posSystem"],
      deliveryPartners: [],
      serviceInterests: [],
      notes: "",
    },
  });

  // Handle field validation on blur
  const handleBlur = async (field: keyof ContactFormData) => {
    await trigger(field);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    setValue("phone", formatted, { shouldValidate: true });
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const parsedNumber = parsePhoneNumber(pastedText);
    const formatted = formatPhoneNumber(parsedNumber);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const resetForm = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("restaurant", "");
    setValue("numberOfLocations", 1);
    setValue("monthlyOrders", 0);
    setValue("restaurantType", "" as ContactFormData["restaurantType"]);
    setValue("posSystem", "" as ContactFormData["posSystem"]);
    setValue("deliveryPartners", []);
    setValue("serviceInterests", []);
    setValue("notes", "");

    setServerError(null);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      setServerError(null);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      toast({
        title: "Success! 🎉",
        description: "Thank you for your submission. We'll be in touch soon!",
        variant: "success",
        duration: 5000,
      });

      resetForm();
    } catch (error) {
      console.error("Form submission error:", error);

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to submit form",
        variant: "error",
        duration: 5000,
      });

      setServerError(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Remove the success message div since we're using toast */}
      {serverError && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-md">
          {serverError}
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Personal Information
        </h3>

        <FormField
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          className="relative"
        >
          <Input
            {...register("name")}
            onBlur={() => handleBlur("name")}
            disabled={isSubmitting}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </FormField>

        <FormField
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          className="relative"
        >
          <Input
            type="email"
            {...register("email")}
            onBlur={() => handleBlur("email")}
            disabled={isSubmitting}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </FormField>

        <FormField
          label="Phone"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          className="relative"
        >
          <Input
            type="tel"
            {...register("phone", {
              onChange: handlePhoneChange,
            })}
            onPaste={handlePhonePaste}
            onBlur={() => handleBlur("phone")}
            disabled={isSubmitting}
            placeholder="(555) 555-1234"
            maxLength={14}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </FormField>
      </div>

      {/* Restaurant Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Restaurant Information
        </h3>

        <FormField
          label="Restaurant Name"
          error={!!errors.restaurant}
          helperText={errors.restaurant?.message}
          className="relative"
        >
          <Input
            {...register("restaurant")}
            onBlur={() => handleBlur("restaurant")}
            disabled={isSubmitting}
            aria-describedby={
              errors.restaurant ? "restaurant-error" : undefined
            }
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Number of Locations"
            error={!!errors.numberOfLocations}
            helperText={errors.numberOfLocations?.message}
            className="relative"
          >
            <Input
              type="number"
              {...register("numberOfLocations", { valueAsNumber: true })}
              onBlur={() => handleBlur("numberOfLocations")}
              disabled={isSubmitting}
              aria-describedby={
                errors.numberOfLocations ? "numberOfLocations-error" : undefined
              }
            />
          </FormField>

          <FormField
            label="Monthly Orders"
            error={!!errors.monthlyOrders}
            helperText={errors.monthlyOrders?.message}
            className="relative"
          >
            <Input
              type="number"
              {...register("monthlyOrders", { valueAsNumber: true })}
              onBlur={() => handleBlur("monthlyOrders")}
              disabled={isSubmitting}
              aria-describedby={
                errors.monthlyOrders ? "monthlyOrders-error" : undefined
              }
            />
          </FormField>
        </div>
      </div>

      {/* Restaurant Type & POS System */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Systems & Services
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Restaurant Type"
            error={!!errors.restaurantType}
            helperText={errors.restaurantType?.message}
            className="relative"
          >
            <Select
              value={watch("restaurantType")}
              onValueChange={(value) => {
                setValue(
                  "restaurantType",
                  value as ContactFormData["restaurantType"]
                );
                void handleBlur("restaurantType");
              }}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {RESTAURANT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="POS System"
            error={!!errors.posSystem}
            helperText={errors.posSystem?.message}
            className="relative"
          >
            <Select
              value={watch("posSystem")}
              onValueChange={(value) => {
                setValue("posSystem", value as ContactFormData["posSystem"]);
                void handleBlur("posSystem");
              }}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select POS" />
              </SelectTrigger>
              <SelectContent>
                {POS_SYSTEMS.map((system) => (
                  <SelectItem key={system.value} value={system.value}>
                    {system.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Delivery Partners and Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Delivery Partners"
            error={!!errors.deliveryPartners}
            helperText={errors.deliveryPartners?.message}
            className="relative"
          >
            <CheckboxGroup
              options={DELIVERY_PARTNERS}
              value={watch("deliveryPartners") || []}
              onChange={(value) =>
                setValue("deliveryPartners", value as DeliveryPartner[])
              }
              onBlur={() => handleBlur("deliveryPartners")}
              disabled={isSubmitting}
            />
          </FormField>

          <FormField
            label="Services Interested In"
            error={!!errors.serviceInterests}
            helperText={errors.serviceInterests?.message}
            className="relative"
          >
            {isLoadingServices ? (
              <div className="flex items-center justify-center py-4">
                <Spinner size="md" />
              </div>
            ) : (
              <CheckboxGroup
                options={services}
                value={watch("serviceInterests") || []}
                onChange={(value) => setValue("serviceInterests", value)}
                onBlur={() => handleBlur("serviceInterests")}
                disabled={isSubmitting}
              />
            )}
          </FormField>
        </div>

        {/* Notes */}
        <FormField
          label="Additional Notes"
          error={!!errors.notes}
          helperText={errors.notes?.message}
          className="relative"
        >
          <Textarea
            {...register("notes")}
            placeholder="Any specific requirements or questions?"
            className="h-32"
            onBlur={() => handleBlur("notes")}
            disabled={isSubmitting}
            aria-describedby={errors.notes ? "notes-error" : undefined}
          />
        </FormField>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="min-w-[100px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}
