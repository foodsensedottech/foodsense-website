"use client";
import { ContactForm } from "@/components/sections/contact/contact-form";

export default function ContactPage() {
  return (
    <main className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary dark:text-primary">
            Contact Us
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
