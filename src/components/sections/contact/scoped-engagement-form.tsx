"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  locationBand,
  type ContactFormData,
} from "@/lib/validation/contact-schema";
import {
  POS_SYSTEMS,
  RESTAURANT_TYPES,
  WHATS_BREAKING,
} from "@/lib/constants/form-fields";
import { Button } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { FormField } from "@/components/ui/form/form-field";
import { PhoneInput } from "@/components/ui/form/phone-input";
import { CheckboxGroup } from "@/components/ui/form/checkbox-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { Spinner } from "@/components/ui/feedback/spinner";
import { contactCopy } from "@/lib/copy/site";

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

const emptyValues: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  companyGroupName: "",
  brandsRepresented: undefined,
  numberOfLocations: undefined,
  restaurantType: undefined,
  restaurantTypeOther: undefined,
  posSystems: [],
  posSystemOther: undefined,
  whatsBreaking: [],
  whatsBreakingOther: undefined,
  growthPipeline: undefined,
};

export function ScopedEngagementForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: emptyValues,
  });

  const [started, setStarted] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const restaurantType = watch("restaurantType");
  const posSystems = watch("posSystems") ?? [];
  const whatsBreaking = watch("whatsBreaking") ?? [];

  const markStart = () => {
    if (started) return;
    setStarted(true);
    pushDataLayer({
      event: "form_start",
      form_id: "contact_v1",
      form_name: "contact",
    });
  };

  const onInvalid = () => {
    pushDataLayer({
      event: "form_error",
      form_id: "contact_v1",
      error_type: "validation",
    });
    setServerError("Please fix the highlighted fields, then click Send inquiry.");
    requestAnimationFrame(() => {
      const invalid = document.querySelector<HTMLElement>(
        "#contact_v1 [aria-invalid='true']"
      );
      (invalid ?? document.getElementById("contact_v1"))?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      setServerError(null);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      pushDataLayer({
        event: "generate_lead",
        form_id: "contact_v1",
        form_name: "contact",
        location_band: locationBand(data.numberOfLocations),
      });

      setSuccess(true);
      reset(emptyValues);
    } catch (error) {
      console.error("Form submission error:", error);
      pushDataLayer({
        event: "form_error",
        form_id: "contact_v1",
        error_type: "network",
      });
      setServerError(contactCopy.error);
    }
  };

  if (success) {
    return (
      <div
        role="status"
        className="rounded-md border border-border bg-card p-6"
      >
        <p>{contactCopy.success}</p>
      </div>
    );
  }

  return (
    <form
      id="contact_v1"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onFocus={markStart}
      className="space-y-6 pb-8"
      noValidate
    >
      {serverError ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-md">
          {serverError}
        </div>
      ) : null}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal</h3>
        <FormField label="Full name" error={errors.name?.message} required>
          <Input {...register("name")} placeholder="Jane Márquez" />
        </FormField>
        <FormField label="Email" error={errors.email?.message} required>
          <Input type="email" {...register("email")} placeholder="jane@company.com" />
        </FormField>
        <FormField
          label="Phone"
          error={errors.phone?.message}
          required
          inputId="contact-phone"
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                id="contact-phone"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={errors.phone ? "true" : undefined}
              />
            )}
          />
        </FormField>
        <p className="-mt-2 text-xs text-muted-foreground">
          Pick the country, then type the local number. You do not need the + sign.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Company</h3>
        <FormField
          label="Company / group name"
          error={errors.companyGroupName?.message}
          required
        >
          <Input {...register("companyGroupName")} placeholder="Acme Franchise Group" />
        </FormField>
        <FormField
          label="Brand(s) represented"
          error={errors.brandsRepresented?.message}
        >
          <Input {...register("brandsRepresented")} placeholder="Brand A, Brand B" />
        </FormField>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Operations</h3>
        <FormField
          label="Number of locations"
          error={errors.numberOfLocations?.message}
        >
          <Input
            type="number"
            min={1}
            inputMode="numeric"
            {...register("numberOfLocations")}
            placeholder="12"
          />
        </FormField>
        <p className="-mt-2 text-xs text-muted-foreground">
          {contactCopy.locationsHelper}
        </p>
        <FormField
          label="Restaurant type"
          error={errors.restaurantType?.message}
        >
          <Select
            value={restaurantType || undefined}
            onValueChange={(value) => {
              setValue("restaurantType", value, { shouldDirty: true });
              if (value !== "other") {
                setValue("restaurantTypeOther", undefined);
              }
            }}
          >
            <SelectTrigger aria-invalid={errors.restaurantType ? "true" : undefined}>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {RESTAURANT_TYPES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        {restaurantType === "other" ? (
          <FormField
            label="Tell us the restaurant type"
            error={errors.restaurantTypeOther?.message}
          >
            <Input
              {...register("restaurantTypeOther")}
              placeholder="Full-service, bakery, stadium, etc."
            />
          </FormField>
        ) : null}
        <FormField
          label="POS system"
          error={errors.posSystems?.message}
        >
          <CheckboxGroup
            idPrefix="pos"
            options={[...POS_SYSTEMS]}
            value={posSystems}
            onChange={(value) =>
              setValue("posSystems", value, { shouldDirty: true, shouldValidate: true })
            }
          />
        </FormField>
        {posSystems.includes("other") ? (
          <FormField
            label="Other POS"
            error={errors.posSystemOther?.message}
          >
            <Input
              {...register("posSystemOther")}
              placeholder="System name"
            />
          </FormField>
        ) : null}
      </div>

      <FormField
        label="What’s breaking"
        error={errors.whatsBreaking?.message}
      >
        <CheckboxGroup
          idPrefix="breaking"
          options={[...WHATS_BREAKING]}
          value={whatsBreaking}
          onChange={(value) =>
            setValue("whatsBreaking", value, { shouldDirty: true, shouldValidate: true })
          }
        />
      </FormField>
      {whatsBreaking.includes("other") ? (
        <FormField
          label="Tell us what’s breaking"
          error={errors.whatsBreakingOther?.message}
        >
          <Textarea
            {...register("whatsBreakingOther")}
            placeholder="What is fractured between Tech, Ops, and Digital"
            className="min-h-[120px]"
          />
        </FormField>
      ) : null}

      <FormField
        label="5–7 year growth pipeline"
        error={errors.growthPipeline?.message}
      >
        <Input
          {...register("growthPipeline")}
          placeholder="Expansion, investors, or franchising"
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting} className="relative z-[70] min-w-[140px]">
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Spinner size="sm" className="text-current" />
            {contactCopy.submittingLabel}
          </span>
        ) : (
          contactCopy.submitLabel
        )}
      </Button>
    </form>
  );
}
