"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { analytics } from "@/lib/analytics/tracking";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      analytics.trackEvent("form_start", {
        event_category: "Form",
        event_label: "contact_form",
        form_id: "contact_form",
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit form");

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

      form.reset();
    } catch (error) {
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Input
          {...form.register("name")}
          placeholder="Your name"
          className="w-full"
        />
        <Input
          {...form.register("email")}
          type="email"
          placeholder="Your email"
          className="w-full"
        />
        <Textarea
          {...form.register("message")}
          placeholder="Your message"
          className="w-full min-h-[120px]"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
