"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/form/checkbox";
import { Label } from "@/components/ui/form/label";
import { analytics } from "@/lib/analytics/tracking";
import { cn } from "@/lib/utils";
import {
  DELIVERY_PARTNERS,
  POS_SYSTEMS,
  RESTAURANT_TYPES,
  SERVICES,
} from "@/lib/constants/form-fields";
import { Loader2, CheckCircle2 } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";
import { Toaster, toast } from "sonner";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isDirty, isSubmitted },
    setValue,
    watch,
    trigger,
    reset,
    getValues,
    clearErrors,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      restaurant: "",
      deliveryPartners: [],
      serviceInterests: [],
      restaurantType: undefined,
      posSystem: undefined,
      numberOfLocations: 1,
      monthlyOrders: 0,
      notes: "",
    },
    mode: "onSubmit",
  });

  // Watch values for validation feedback
  const deliveryPartners = watch("deliveryPartners");
  const serviceInterests = watch("serviceInterests");

  // Trigger validation on multi-select changes
  useEffect(() => {
    if (touchedFields.deliveryPartners) {
      trigger("deliveryPartners");
    }
  }, [deliveryPartners, trigger, touchedFields.deliveryPartners]);

  useEffect(() => {
    if (touchedFields.serviceInterests) {
      trigger("serviceInterests");
    }
  }, [serviceInterests, trigger, touchedFields.serviceInterests]);

  // Debug form state
  useEffect(() => {
    console.log("Form Errors:", errors);
  }, [errors]);

  // Custom reset function to clear form and state
  const handleReset = useCallback(() => {
    const resetData = {
      name: "",
      email: "",
      phone: "",
      restaurant: "",
      numberOfLocations: 1,
      monthlyOrders: 0,
      deliveryPartners: [],
      serviceInterests: [],
      restaurantType: "dine_in" as
        | "dine_in"
        | "fast_casual"
        | "quick_service"
        | "ghost_kitchen"
        | "food_truck"
        | "other",
      posSystem: "toast" as
        | "toast"
        | "clover"
        | "square"
        | "lightspeed"
        | "spoton"
        | "qupos"
        | "aloha"
        | "xenial"
        | "par"
        | "ncr"
        | "oracle"
        | "other",
      notes: "",
    };

    reset(resetData);

    // Reset the Select component values manually as they don't reset properly
    setValue(
      "restaurantType",
      "dine_in" as
        | "dine_in"
        | "fast_casual"
        | "quick_service"
        | "ghost_kitchen"
        | "food_truck"
        | "other"
    );
    setValue(
      "posSystem",
      "toast" as
        | "toast"
        | "clover"
        | "square"
        | "lightspeed"
        | "spoton"
        | "qupos"
        | "aloha"
        | "xenial"
        | "par"
        | "ncr"
        | "oracle"
        | "other"
    );
    setValue("deliveryPartners", []);
    setValue("serviceInterests", []);
    clearErrors();
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(true);
  }, [reset, setValue, clearErrors]);

  const onSubmit = async (data: ContactFormData) => {
    console.log("🔵 onSubmit handler called");
    console.log("Form submitted with data:", data);
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setIsSuccess(false);

      // Log the current state
      console.log("Current form state:", {
        isSubmitting,
        submitError,
        isSuccess,
        data,
      });

      analytics.trackEvent("form_start", {
        event_category: "Form",
        event_label: "contact_form",
        form_id: "contact_form",
      });

      console.log("Sending request to /api/contact");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (!response.ok) {
        const errorMessage = result.error || "Failed to submit form";
        console.error("Form submission error:", errorMessage);
        throw new Error(errorMessage);
      }

      analytics.trackEvent("form_complete", {
        event_category: "Form",
        event_label: "contact_form",
        form_id: "contact_form",
        success: true,
      });

      analytics.trackEvent("conversion", {
        event_category: "Form",
        event_label: "contact_form_submission",
        conversion_type: "contact",
      });

      handleReset();
      toast.success("Thank you! We'll be in touch soon.", {
        duration: 5000,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.";

      setSubmitError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
      });

      analytics.trackEvent("form_complete", {
        event_category: "Form",
        event_label: "contact_form",
        form_id: "contact_form",
        success: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.log("🔴 Form validation errors:", errors);
    setSubmitError("Please fill in all required fields correctly.");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="space-y-6"
        noValidate
      >
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="First and Last Name"
                required
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                {...register("phone")}
                id="phone"
                placeholder="(555) 555-1234"
                required
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  e.target.value = formatted;
                }}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Restaurant Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Restaurant Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant">Restaurant Name</Label>
              <Input
                {...register("restaurant")}
                id="restaurant"
                placeholder="Restaurant name"
                required
              />
              {errors.restaurant && (
                <p className="text-sm text-red-500">
                  {errors.restaurant.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfLocations">Number of Locations</Label>
              <Input
                {...register("numberOfLocations", { valueAsNumber: true })}
                id="numberOfLocations"
                type="number"
                min="1"
                placeholder="Number of locations"
                required
              />
              {errors.numberOfLocations && (
                <p className="text-sm text-red-500">
                  {errors.numberOfLocations.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyOrders">Monthly Orders</Label>
              <Input
                {...register("monthlyOrders", { valueAsNumber: true })}
                id="monthlyOrders"
                type="number"
                min="0"
                placeholder="Average monthly orders"
                required
              />
              {errors.monthlyOrders && (
                <p className="text-sm text-red-500">
                  {errors.monthlyOrders.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantType">Restaurant Type</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "restaurantType",
                    value as
                      | "dine_in"
                      | "fast_casual"
                      | "quick_service"
                      | "ghost_kitchen"
                      | "food_truck"
                      | "other",
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    }
                  )
                }
                value={watch("restaurantType")}
              >
                <SelectTrigger id="restaurantType">
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
              {errors.restaurantType && (
                <p className="text-sm text-red-500">
                  {errors.restaurantType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="posSystem">POS System</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "posSystem",
                    value as
                      | "toast"
                      | "clover"
                      | "square"
                      | "lightspeed"
                      | "spoton"
                      | "qupos"
                      | "aloha"
                      | "xenial"
                      | "par"
                      | "ncr"
                      | "oracle"
                      | "other",
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    }
                  )
                }
                value={watch("posSystem")}
              >
                <SelectTrigger id="posSystem">
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
              {errors.posSystem && (
                <p className="text-sm text-red-500">
                  {errors.posSystem.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Partners and Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delivery Partners */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Delivery Partners</h3>
            <div className="space-y-2">
              {DELIVERY_PARTNERS.map((partner) => (
                <div
                  key={partner.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`partner-${partner.value}`}
                    {...register("deliveryPartners")}
                    value={partner.value}
                    onCheckedChange={(checked) => {
                      const currentValues = getValues("deliveryPartners") || [];
                      const newValues = checked
                        ? [...currentValues, partner.value]
                        : currentValues.filter(
                            (value) => value !== partner.value
                          );
                      setValue("deliveryPartners", newValues, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                  <Label htmlFor={`partner-${partner.value}`}>
                    {partner.label}
                  </Label>
                </div>
              ))}
            </div>
            {(isDirty || isSubmitted) && errors.deliveryPartners && (
              <p className="text-sm text-red-500">
                {errors.deliveryPartners.message}
              </p>
            )}
          </div>

          {/* Services Interested */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services Interested In</h3>
            <div className="space-y-2">
              {SERVICES.map((service) => (
                <div
                  key={service.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`service-${service.value}`}
                    {...register("serviceInterests")}
                    value={service.value}
                    onCheckedChange={(checked) => {
                      const currentValues = getValues("serviceInterests") || [];
                      const newValues = checked
                        ? [...currentValues, service.value]
                        : currentValues.filter(
                            (value) => value !== service.value
                          );
                      setValue("serviceInterests", newValues, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                  <Label htmlFor={`service-${service.value}`}>
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
            {(isDirty || isSubmitted) && errors.serviceInterests && (
              <p className="text-sm text-red-500">
                {errors.serviceInterests.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            {...register("notes")}
            id="notes"
            placeholder="Any additional information you'd like to share"
            className="min-h-[100px]"
          />
          {errors.notes && (
            <p className="text-sm text-red-500">{errors.notes.message}</p>
          )}
        </div>

        {/* Submit Button and Messages */}
        <div className="space-y-4">
          <div className="flex justify-center w-full">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-1/2 lg:w-1/3"
              onClick={(e) => {
                console.log("🔵 Submit button clicked");
                console.log("Current form values:", getValues());
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>

          {/* Form-level Error Message */}
          {Object.keys(errors).length > 0 && (
            <div className="flex items-center justify-center space-x-2 text-red-500 mt-4">
              <span className="text-sm">
                Please fill in all required fields correctly.
              </span>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span>Thank you! We'll be in touch soon.</span>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="flex items-center justify-center space-x-2 text-red-500 mt-4">
              <span className="text-sm">{submitError}</span>
            </div>
          )}
        </div>
      </form>
      <Toaster richColors position="top-center" />
    </>
  );
}
