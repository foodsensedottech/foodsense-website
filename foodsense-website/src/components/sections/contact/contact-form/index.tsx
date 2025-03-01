"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  ContactFormData,
  RestaurantType,
  PosSystem,
  DeliveryPartner,
} from "@/lib/validation/contact-schema";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import { formatPhoneNumber, parsePhoneNumber } from "@/lib/utils/format-phone";
import { Button } from "@/components/ui/form/button";
import { Input } from "@/components/ui/form/input";
import { Spinner } from "@/components/ui/feedback/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { CheckboxGroup } from "@/components/ui/form/checkbox-group";
import { Textarea } from "@/components/ui/form/textarea";
import { FormField } from "@/components/ui/form/form-field";
import { useToast } from "@/components/providers/toast-provider";
import {
  DELIVERY_PARTNERS,
  POS_SYSTEMS,
  RESTAURANT_TYPES,
  SERVICES,
  type ServiceType,
} from "@/lib/constants/form-fields";
import type { CheckboxOption } from "@/components/ui/form/checkbox-group";
import type { ServiceOption } from "@/lib/types";
import { CheckCircle2, XCircle } from "lucide-react";

export function ContactForm() {
  const { register, handleSubmit, formState, watch, setValue, reset } =
    useForm<ContactFormData>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        restaurant: "",
        numberOfLocations: 1,
        monthlyOrders: 0,
        restaurantType: undefined,
        posSystem: undefined,
        deliveryPartners: [],
        serviceInterests: [],
        notes: "",
      },
    });

  const { errors, isSubmitting, isDirty } = formState;
  const [serverError, setServerError] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Phone number formatting
  const phone = watch("phone");
  React.useEffect(() => {
    const formatted = formatPhoneNumber(phone);
    if (formatted !== phone) {
      setValue("phone", formatted, { shouldValidate: true });
    }
  }, [phone, setValue]);

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

      toast({
        title: (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span>Success!</span>
          </div>
        ),
        description: (
          <p className="text-emerald-600 dark:text-emerald-400">
            Thank you for filling out the form! We will be in touch with you
            very soon.
          </p>
        ),
        duration: 5000,
      });

      reset({
        name: "",
        email: "",
        phone: "",
        restaurant: "",
        numberOfLocations: 1,
        monthlyOrders: 0,
        restaurantType: undefined,
        posSystem: undefined,
        deliveryPartners: [],
        serviceInterests: [],
        notes: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <XCircle className="h-5 w-5" />
            <span>Error</span>
          </div>
        ),
        description: (
          <p className="text-red-600 dark:text-red-400">
            There was a problem submitting your form. Please try again.
          </p>
        ),
        duration: 5000,
      });
      setServerError(
        "There was a problem submitting your form. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Message */}
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
        <div className="grid grid-cols-1 gap-4">
          <FormField
            label="Full Name"
            error={errors.name?.message}
            required
            className="space-y-2"
          >
            <Input
              {...register("name")}
              className="w-full bg-background border-input focus:ring-2 focus:ring-primary"
            />
          </FormField>
          <FormField label="Email" error={errors.email?.message} required>
            <Input type="email" {...register("email")} />
          </FormField>
          <FormField label="Phone" error={errors.phone?.message} required>
            <Input {...register("phone")} />
          </FormField>
        </div>
      </div>

      {/* Restaurant Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Restaurant Information
        </h3>
        <FormField
          label="Restaurant Name"
          error={errors.restaurant?.message}
          required
        >
          <Input {...register("restaurant")} />
        </FormField>
        <FormField
          label="Restaurant Type"
          error={errors.restaurantType?.message}
          required
        >
          <Select
            value={watch("restaurantType")}
            onValueChange={(value: RestaurantType) =>
              setValue("restaurantType", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue
                placeholder="Select restaurant type"
                className="text-muted-foreground"
              />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {RESTAURANT_TYPES.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Number of Locations"
            error={errors.numberOfLocations?.message}
            required
          >
            <Input
              type="number"
              {...register("numberOfLocations", { valueAsNumber: true })}
              className="w-full bg-background border-input focus:ring-2 focus:ring-primary"
              min={1}
            />
          </FormField>
          <FormField
            label="Monthly Orders"
            error={errors.monthlyOrders?.message}
            required
          >
            <Input
              type="number"
              {...register("monthlyOrders", { valueAsNumber: true })}
            />
          </FormField>
        </div>
      </div>

      {/* Systems & Services */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-primary">
          Systems & Services
        </h3>

        {/* POS System */}
        <FormField
          label="POS System"
          error={errors.posSystem?.message}
          required
        >
          <Select
            value={watch("posSystem")}
            onValueChange={(value: PosSystem) =>
              setValue("posSystem", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue
                placeholder="Select POS system"
                className="text-muted-foreground"
              />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {POS_SYSTEMS.map((system) => (
                <SelectItem
                  key={system.value}
                  value={system.value}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  {system.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {/* Delivery Partners and Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Partners */}
          <FormField
            label="Delivery Partners"
            error={errors.deliveryPartners?.message}
          >
            <CheckboxGroup
              options={DELIVERY_PARTNERS.map((partner) => ({
                label: partner.label,
                value: partner.value,
              }))}
              value={watch("deliveryPartners")}
              onChange={(value) =>
                setValue("deliveryPartners", value as DeliveryPartner[], {
                  shouldValidate: true,
                })
              }
              className="grid grid-cols-1 gap-1"
              itemClassName="flex items-center space-x-2 hover:bg-accent/50 rounded-md cursor-pointer"
            />
          </FormField>

          {/* Services Interested In */}
          <FormField
            label="Services Interested In"
            error={errors.serviceInterests?.message}
          >
            <CheckboxGroup
              options={SERVICES.map((service) => ({
                label: service.name,
                value: service.id,
              }))}
              value={watch("serviceInterests")}
              onChange={(value) =>
                setValue("serviceInterests", value as ServiceType[], {
                  shouldValidate: true,
                })
              }
              className="grid grid-cols-1 gap-1"
              itemClassName="flex items-center space-x-2 hover:bg-accent/50 rounded-md cursor-pointer"
            />
          </FormField>
        </div>

        {/* Additional Notes */}
        <FormField label="Additional Notes" error={errors.notes?.message}>
          <Textarea
            {...register("notes")}
            className="w-full bg-background border-input focus:ring-2 focus:ring-primary min-h-[100px]"
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
          className="bg-background hover:bg-accent hover:text-accent-foreground border-input"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="min-w-[100px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" className="text-current" />
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
