"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { Label } from "@/components/ui/form/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import {
  PRIMARY_CHALLENGES,
  strategyAuditSchema,
  type StrategyAuditFormData,
} from "@/lib/validation/strategy-audit-schema";
import type { ConversionHomepage } from "@/lib/content/conversion-seed";

interface Props {
  data: ConversionHomepage["contact"];
}

export function ConversionContact({ data }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<StrategyAuditFormData>({
    resolver: zodResolver(strategyAuditSchema),
    defaultValues: {
      name: "",
      email: "",
      restaurant: "",
      primaryChallenge: undefined,
      notes: "",
    },
  });

  const onSubmit = async (formData: StrategyAuditFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit");
      }
      setIsSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-[#13283f] mb-3">
            {data.heading}
          </h2>
          <p className="text-lg text-[#13283f]/75">{data.subheading}</p>
          <p className="mt-2 text-sm text-[#8a6a1f]">{data.responseNote}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="audit-name">Name</Label>
            <Input id="audit-name" {...register("name")} placeholder="Your name" />
            {errors.name ? (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="audit-email">Email</Label>
            <Input
              id="audit-email"
              type="email"
              {...register("email")}
              placeholder="you@company.com"
            />
            {errors.email ? (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="audit-restaurant">Restaurant Name</Label>
            <Input
              id="audit-restaurant"
              {...register("restaurant")}
              placeholder="Brand or franchisee group"
            />
            {errors.restaurant ? (
              <p className="text-sm text-red-500">{errors.restaurant.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="audit-challenge">Primary Challenge</Label>
            <Select
              value={watch("primaryChallenge")}
              onValueChange={(value) =>
                setValue(
                  "primaryChallenge",
                  value as StrategyAuditFormData["primaryChallenge"],
                  { shouldValidate: true, shouldDirty: true }
                )
              }
            >
              <SelectTrigger id="audit-challenge">
                <SelectValue placeholder="Select a challenge" />
              </SelectTrigger>
              <SelectContent>
                {PRIMARY_CHALLENGES.map((challenge) => (
                  <SelectItem key={challenge.value} value={challenge.value}>
                    {challenge.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.primaryChallenge ? (
              <p className="text-sm text-red-500">
                {errors.primaryChallenge.message}
              </p>
            ) : null}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1e3a5f] text-amber-300 hover:bg-[#13283f]"
              size="lg"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </span>
              ) : (
                data.ctaLabel
              )}
            </Button>
          </div>

          {isSuccess ? (
            <p className="text-center text-green-700 text-sm">
              Thanks — we&apos;ll respond within 24 hours.
            </p>
          ) : null}
          {submitError ? (
            <p className="text-center text-red-500 text-sm">{submitError}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
