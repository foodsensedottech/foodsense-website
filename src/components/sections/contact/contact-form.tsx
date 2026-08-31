"use client";

import { useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import type { ContactFormData } from "@/lib/validation/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { CheckboxGroup } from "@/components/ui/form/checkbox-group";
import { PhoneInput } from "@/components/ui/form/phone-input";
import { Label } from "@/components/ui/form/label";
import { analytics } from "@/lib/analytics/tracking";
import {
  LOCATION_BANDS,
  POS_SYSTEMS,
  RESTAURANT_TYPES,
  SERVICE_INTERESTS,
} from "@/lib/constants/form-fields";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  /** Optional hero copy (homepage contact section). */
  heading?: string;
  subheading?: string;
  responseNote?: string;
  submitLabel?: string;
  formId?: string;
  className?: string;
  /** Tighter layout for homepage embed vs standalone /contact page. */
  variant?: "page" | "homepage";
}

export function ContactForm({
  heading,
  subheading,
  responseNote,
  submitLabel = "Submit",
  formId = "contact_form",
  className,
  variant = "page",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitted },
    setValue,
    watch,
    reset,
    clearErrors,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      restaurantBrands: "",
      locationBand: undefined,
      restaurantType: undefined,
      posSystem: undefined,
      serviceInterests: [],
      notes: "",
    },
    mode: "onSubmit",
  });

  const handleReset = useCallback(() => {
    reset({
      name: "",
      email: "",
      phone: "",
      restaurantBrands: "",
      locationBand: undefined,
      restaurantType: undefined,
      posSystem: undefined,
      serviceInterests: [],
      notes: "",
    });
    clearErrors();
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(true);
  }, [reset, clearErrors]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setIsSuccess(false);

      analytics.trackEvent("form_start", {
        event_category: "Form",
        event_label: formId,
        form_id: formId,
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      analytics.trackEvent("form_complete", {
        event_category: "Form",
        event_label: formId,
        form_id: formId,
        success: true,
      });

      analytics.trackEvent("conversion", {
        event_category: "Form",
        event_label: `${formId}_submission`,
        conversion_type: "contact",
      });

      handleReset();
      toast.success("Thank you! We'll be in touch soon.", { duration: 5000 });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.";

      setSubmitError(errorMessage);
      toast.error(errorMessage, { duration: 5000 });

      analytics.trackEvent("form_complete", {
        event_category: "Form",
        event_label: formId,
        form_id: formId,
        success: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    setSubmitError("Please fill in all required fields correctly.");
  };

  const isHomepage = variant === "homepage";

  return (
    <>
      {(heading || subheading || responseNote) && (
        <div className={cn("text-center mb-10", isHomepage && "mb-8")}>
          {heading ? (
            <h2
              className={cn(
                "font-display text-[#253B59] mb-3",
                isHomepage
                  ? "text-3xl md:text-4xl"
                  : "text-2xl md:text-3xl font-bold"
              )}
            >
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className="text-lg text-[#253B59]/75">{subheading}</p>
          ) : null}
          {responseNote ? (
            <p className="mt-2 text-sm text-[#D4A800]">{responseNote}</p>
          ) : null}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={cn("space-y-6", className)}
        noValidate
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#253B59]">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${formId}-name`}>Full Name</Label>
              <Input
                {...register("name")}
                id={`${formId}-name`}
                placeholder="First and Last Name"
              />
              {errors.name ? (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${formId}-email`}>Email</Label>
              <Input
                {...register("email")}
                id={`${formId}-email`}
                type="email"
                placeholder="you@company.com"
              />
              {errors.email ? (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${formId}-phone`}>Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id={`${formId}-phone`}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                )}
              />
              {errors.phone ? (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#253B59]">
            Restaurant Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="space-y-2 md:col-span-8">
              <Label htmlFor={`${formId}-brands`}>Restaurant Brand(s)</Label>
              <Input
                {...register("restaurantBrands")}
                id={`${formId}-brands`}
                placeholder="Brand A, Brand B"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple brand names with commas.
              </p>
              {errors.restaurantBrands ? (
                <p className="text-sm text-red-500">
                  {errors.restaurantBrands.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2 md:col-span-4">
              <Label htmlFor={`${formId}-locations`}>Number of Locations</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "locationBand",
                    value as ContactFormData["locationBand"],
                    { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                  )
                }
                value={watch("locationBand")}
              >
                <SelectTrigger id={`${formId}-locations`}>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATION_BANDS.map((band) => (
                    <SelectItem key={band.value} value={band.value}>
                      {band.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.locationBand ? (
                <p className="text-sm text-red-500">
                  {errors.locationBand.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${formId}-restaurant-type`}>Restaurant Type</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "restaurantType",
                    value as ContactFormData["restaurantType"],
                    { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                  )
                }
                value={watch("restaurantType")}
              >
                <SelectTrigger id={`${formId}-restaurant-type`}>
                  <SelectValue placeholder="Select restaurant type" />
                </SelectTrigger>
                <SelectContent>
                  {RESTAURANT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.restaurantType ? (
                <p className="text-sm text-red-500">
                  {errors.restaurantType.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${formId}-pos`}>POS System</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "posSystem",
                    value as ContactFormData["posSystem"],
                    { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                  )
                }
                value={watch("posSystem")}
              >
                <SelectTrigger id={`${formId}-pos`}>
                  <SelectValue placeholder="Select POS system" />
                </SelectTrigger>
                <SelectContent>
                  {POS_SYSTEMS.map((system) => (
                    <SelectItem key={system.value} value={system.value}>
                      {system.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.posSystem ? (
                <p className="text-sm text-red-500">
                  {errors.posSystem.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#253B59]">
            Services Interested In
          </h3>
          <Controller
            name="serviceInterests"
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                idPrefix={`${formId}-service`}
                options={SERVICE_INTERESTS.map((service) => ({
                  label: service.label,
                  value: service.value,
                }))}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={
                  (isDirty || isSubmitted) && errors.serviceInterests
                    ? errors.serviceInterests.message
                    : undefined
                }
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-notes`}>Additional Notes (optional)</Label>
          <Textarea
            {...register("notes")}
            id={`${formId}-notes`}
            placeholder="Anything else we should know"
            className="min-h-[100px]"
          />
          {errors.notes ? (
            <p className="text-sm text-red-500">{errors.notes.message}</p>
          ) : null}
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full",
              isHomepage &&
                "bg-[#253B59] text-[#F1C100] hover:bg-[#253B59] h-11 text-base"
            )}
            size="lg"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </span>
            ) : (
              submitLabel
            )}
          </Button>

          {isSuccess ? (
            <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>Thanks — we&apos;ll respond within 24 hours.</span>
            </div>
          ) : null}

          {submitError ? (
            <p className="text-center text-red-500 text-sm">{submitError}</p>
          ) : null}
        </div>
      </form>
      <Toaster richColors position="top-center" />
    </>
  );
}
