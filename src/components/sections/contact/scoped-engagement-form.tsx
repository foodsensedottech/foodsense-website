"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  locationBand,
  type ContactFormData,
} from "@/lib/validation/contact-schema";
import { Button } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { FormField } from "@/components/ui/form/form-field";
import { Spinner } from "@/components/ui/feedback/spinner";
import { contactCopy } from "@/lib/copy/site";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function ScopedEngagementForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyGroupName: "",
      brandsRepresented: "",
      numberOfLocations: undefined,
      restaurantType: "",
      posSystem: "",
      whatsBreaking: "",
      growthPipeline: "",
    },
  });

  const [started, setStarted] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const markStart = () => {
    if (started) return;
    setStarted(true);
    pushDataLayer({
      event: "form_start",
      form_id: "contact_v1",
      form_name: "contact",
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
      reset();
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
      onSubmit={handleSubmit(onSubmit, () => {
        pushDataLayer({
          event: "form_error",
          form_id: "contact_v1",
          error_type: "validation",
        });
      })}
      onFocus={markStart}
      className="space-y-6"
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
        <FormField label="Phone" error={errors.phone?.message} required>
          <Input type="tel" {...register("phone")} placeholder="+1 305 555 0100" />
        </FormField>
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
          required
        >
          <Input {...register("brandsRepresented")} placeholder="Brand A, Brand B" />
        </FormField>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Operations</h3>
        <FormField
          label="Number of locations"
          error={errors.numberOfLocations?.message}
          required
        >
          <Input
            type="number"
            min={1}
            {...register("numberOfLocations", { valueAsNumber: true })}
            placeholder="12"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {contactCopy.locationsHelper}
          </p>
        </FormField>
        <FormField
          label="Restaurant type"
          error={errors.restaurantType?.message}
          required
        >
          <Input
            {...register("restaurantType")}
            placeholder="QSR, fast casual, multi-brand group"
          />
        </FormField>
        <FormField label="POS system" error={errors.posSystem?.message} required>
          <Input
            {...register("posSystem")}
            placeholder="Oracle, NCR, Toast, mixed, none yet"
          />
        </FormField>
      </div>

      <FormField
        label="What’s breaking"
        error={errors.whatsBreaking?.message}
        required
      >
        <Textarea
          {...register("whatsBreaking")}
          placeholder="Siloed stack, slow vendor, no owner of standardization"
          className="min-h-[120px]"
        />
      </FormField>

      <FormField
        label="5–7 year growth pipeline (optional)"
        error={errors.growthPipeline?.message}
      >
        <Input
          {...register("growthPipeline")}
          placeholder="Expansion, investors, or franchising"
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
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
