"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ContactFormSchema } from "@/lib/validation/contact-schema";
import type { ServiceOptionEntry } from "@/types/contentful/service-form-options";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import { formatPhoneNumber } from "@/lib/utils/format-phone";
import {
  RESTAURANT_TYPES,
  DELIVERY_PARTNERS,
  POS_SYSTEMS,
} from "@/lib/hubspot/types";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { Select } from "@/components/ui/form/select";

interface ServiceOption {
  id: string;
  title: string;
  description?: string;
}

interface ContactFormProps {
  services: ServiceOption[];
}

export function ContactForm({ services }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      restaurant: "",
      numberOfLocations: 1,
      monthlyOrders: "",
      restaurantType: RESTAURANT_TYPES.dine_in,
      serviceInterests: [],
      deliveryPartners: [],
      posSystem: "",
      notes: "",
    },
  });

  const phoneValue = watch("phone");

  const onSubmit = async (data: ContactFormSchema) => {
    console.log("Form submission data:", {
      deliveryPartners: data.deliveryPartners,
      serviceInterests: data.serviceInterests,
    });
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitStatus("submitting");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to create contact in HubSpot");
      }

      setSubmitStatus("success");
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit form. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="mt-3 text-lg font-medium text-green-800">
          Thank you for your interest!
        </h3>
        <p className="mt-2 text-green-700">
          We&apos;ve received your information and will be in touch shortly.
        </p>
      </div>
    );
  }

  if (submitError) {
    return (
      <div className="rounded-md bg-red-50 p-4 mb-6">
        <div className="flex">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Submission Error
            </h3>
            <p className="text-sm text-red-700 mt-1">{submitError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Full Name"
        required
        {...register("name")}
        error={errors.name?.message}
        touched={touchedFields.name}
        isDirty={dirtyFields.name}
        disabled={isSubmitting}
      />

      <Input
        label="Email"
        type="email"
        required
        {...register("email")}
        error={errors.email?.message}
        touched={touchedFields.email}
        isDirty={dirtyFields.email}
        disabled={isSubmitting}
      />

      <Input
        label="Phone"
        type="tel"
        required
        {...register("phone")}
        onChange={(e) => {
          const formatted = formatPhoneNumber(e.target.value);
          setValue("phone", formatted);
        }}
        value={phoneValue}
        error={errors.phone?.message}
        touched={touchedFields.phone}
        isDirty={dirtyFields.phone}
        disabled={isSubmitting}
      />

      <Input
        label="Restaurant Name"
        required
        {...register("restaurant")}
        error={errors.restaurant?.message}
        touched={touchedFields.restaurant}
        isDirty={dirtyFields.restaurant}
        disabled={isSubmitting}
      />

      <Input
        label="Number of Locations"
        type="number"
        required
        min={1}
        {...register("numberOfLocations", { valueAsNumber: true })}
        error={errors.numberOfLocations?.message}
        touched={touchedFields.numberOfLocations}
        isDirty={dirtyFields.numberOfLocations}
        disabled={isSubmitting}
      />

      <Input
        label="Monthly Orders"
        placeholder="e.g., 1000-2000"
        {...register("monthlyOrders")}
        error={errors.monthlyOrders?.message}
        touched={touchedFields.monthlyOrders}
        isDirty={dirtyFields.monthlyOrders}
        disabled={isSubmitting}
        helpText="Approximate number of orders per month"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Delivery Partners
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.values(DELIVERY_PARTNERS).map((partner) => (
            <label
              key={partner}
              className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50"
            >
              <input
                type="checkbox"
                value={partner}
                {...register("deliveryPartners")}
                disabled={isSubmitting}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-900">{partner}</span>
            </label>
          ))}
        </div>
        {errors.deliveryPartners && (
          <p className="text-sm text-red-500">
            {errors.deliveryPartners.message}
          </p>
        )}
      </div>

      <Select
        label="POS System"
        {...register("posSystem")}
        error={errors.posSystem?.message}
        disabled={isSubmitting}
        options={Object.values(POS_SYSTEMS).map((system) => ({
          value: system,
          label: system,
        }))}
        placeholder="Select a POS System"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Restaurant Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(RESTAURANT_TYPES).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50"
            >
              <input
                type="radio"
                value={value}
                {...register("restaurantType")}
                disabled={isSubmitting}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-900">{value}</span>
            </label>
          ))}
        </div>
        {errors.restaurantType && (
          <p className="text-sm text-red-500">
            {errors.restaurantType.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Services Interested In <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-start space-x-2 p-3 border rounded-md hover:bg-gray-50"
            >
              <input
                type="checkbox"
                value={`${service.id}:${service.title}`}
                {...register("serviceInterests")}
                disabled={isSubmitting}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {service.title}
                </span>
                {service.description && (
                  <p className="text-sm text-gray-500">{service.description}</p>
                )}
              </div>
            </label>
          ))}
        </div>
        {errors.serviceInterests && (
          <p className="text-sm text-red-500">
            {errors.serviceInterests.message}
          </p>
        )}
      </div>

      <Textarea
        label="Additional Notes"
        {...register("notes")}
        error={errors.notes?.message}
        touched={touchedFields.notes}
        isDirty={dirtyFields.notes}
        disabled={isSubmitting}
        placeholder="Tell us more about your needs..."
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full px-4 py-2 text-white font-medium rounded-md
          ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
          transition-colors duration-200
        `}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
