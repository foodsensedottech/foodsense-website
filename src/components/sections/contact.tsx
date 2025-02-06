"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { Instagram, Link as LinkIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { analyticsEvents, trackConversion, useSectionVisibility } from "@/lib/analytics";
import { formAnalytics } from '@/lib/analytics/form-tracking';

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const socialPlatforms = [
  "Facebook",
  "Twitter",
  "LinkedIn",
  "TikTok",
  "YouTube",
  "Other"
];

const deliveryPlatforms = [
  "UberEats",
  "DoorDash",
  "Grubhub",
  "ezCater",
  "Other"
];

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required and must be at least 2 characters"),
  phone: z.string()
    .min(14, "Phone number is required")
    .regex(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Please enter a valid phone number: (555) 555-5555"
    ),
  email: z.string().email("A valid email address is required"),
  restaurant: z.string().min(2, "Restaurant name is required"),
  city: z.string().optional(),
  state: z.string().optional(),
  instagram: z.string().optional(),
  socialPlatform: z.string().optional(),
  socialLink: z.string().optional(),
  comments: z.string().optional(),
  deliveryPlatforms: z.array(z.string())
});

type ContactFormData = z.infer<typeof contactSchema>;

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  
  return (
    <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
      <span className="sr-only">Error:</span>
      {message}
    </p>
  );
};

function formatPhoneNumber(value: string) {
  // Remove all non-digits
  const numbers = value.replace(/\D/g, "").slice(0, 10);
  
  // Format the number as user types
  if (numbers.length === 0) return "";
  if (numbers.length < 4) return `(${numbers}`;
  if (numbers.length < 7) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
}

export function Contact({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      analyticsEvents.trackFormSubmission('contact');
      
      trackConversion('AW-CONVERSION_ID', 'contact_form_success');

      toast.success("Thanks for reaching out!", {
        description: "We'll get back to you within 24 hours.",
      });
      
      reset();
      setSelectedPlatforms([]);
      setSelectedSocialPlatform("");

      formAnalytics.trackFormSubmission('contact_form', 'success', {
        hasEmail: !!data.email,
        hasPhone: !!data.phone,
        deliveryPlatformsCount: data.deliveryPlatforms.length,
        // Don't include sensitive data
      });
    } catch (error) {
      const err = error as { message: string };
      toast.error("Something went wrong", {
        description: "Please try again or contact support.",
      });
      console.error("Error submitting form:", error);

      formAnalytics.trackFormSubmission('contact_form', 'error', {
        errorType: err.message
      });
    }
  };

  function handlePlatformToggle(platform: string) {
    setSelectedPlatforms(prev => {
      const newPlatforms = prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform];
      
      analyticsEvents.trackPlatformSelection(platform);
      return newPlatforms;
    });
  }

  function handleInstagramInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!value.startsWith('@') && value.length > 0) {
      e.target.value = `@${value}`;
    }
  }

  function handleSocialInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (selectedSocialPlatform === 'Instagram' || 
        selectedSocialPlatform === 'Twitter' || 
        selectedSocialPlatform === 'TikTok') {
      const value = e.target.value;
      if (!value.startsWith('@') && value.length > 0) {
        e.target.value = `@${value}`;
      }
    }
  }

  function handlePhoneInput(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    setValue("phone", formatted, { shouldValidate: true });
  }

  const inputClasses = cn(
    "w-full px-4 py-2 rounded-lg",
    "bg-gray-50 dark:bg-gray-900/50",
    "border border-gray-200 dark:border-gray-700",
    "text-secondary dark:text-white",
    "placeholder:text-gray-500 dark:placeholder:text-gray-400",
    "focus:ring-2 focus:ring-primary focus:border-transparent",
    "transition-colors duration-200"
  );

  const selectClasses = cn(
    inputClasses,
    "appearance-none",
    "bg-no-repeat bg-[length:20px_20px] bg-[right_1rem_center]",
    "dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiA5bDYgNiA2LTYiLz48L3N2Zz4=')]",
    "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiA5bDYgNiA2LTYiLz48L3N2Zz4=')]"
  );

  // Define consistent error styles
  const getInputStyles = (error?: { message?: string }) => cn(
    inputClasses,
    error && [
      "border-red-500 dark:border-red-400",
      "ring-1 ring-red-500 dark:ring-red-400",
      "focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400",
      "focus:border-red-500 dark:focus:border-red-400"
    ]
  );

  useSectionVisibility('contact');

  const trackField = (name: string, action: 'focus' | 'blur' | 'input') => {
    formAnalytics.trackFieldInteraction(name, action);
    
    // Calculate and track progress
    const progress = calculateFormProgress();
    formAnalytics.trackFormProgress('contact_form', progress);
  };

  function calculateFormProgress(): number {
    const requiredFields = ['name', 'email', 'phone', 'restaurant'];
    const optionalFields = ['city', 'state', 'instagram', 'socialPlatform', 'socialLink', 'comments'];
    
    const formValues = getValues();
    
    // Required fields count double
    const requiredProgress = requiredFields.reduce((acc, field) => {
      return acc + (formValues[field as keyof ContactFormData] ? 2 : 0);
    }, 0);
    
    // Optional fields count single
    const optionalProgress = optionalFields.reduce((acc, field) => {
      return acc + (formValues[field as keyof ContactFormData] ? 1 : 0);
    }, 0);
    
    // Delivery platforms count as one field
    const platformProgress = selectedPlatforms.length > 0 ? 1 : 0;
    
    // Calculate total possible progress
    const maxProgress = (requiredFields.length * 2) + optionalFields.length + 1;
    const currentProgress = requiredProgress + optionalProgress + platformProgress;
    
    return Math.round((currentProgress / maxProgress) * 100);
  }

  return (
    <section id="contact" className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-secondary/80 dark:text-white/80">
            Ready to grow your restaurant? Let&apos;s talk about how we can help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  onFocus={() => trackField('name', 'focus')}
                  onBlur={() => trackField('name', 'blur')}
                  onChange={() => trackField('name', 'input')}
                  className={getInputStyles(errors.name)}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                <ErrorMessage message={errors.name?.message} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  {...register("phone")}
                  onInput={handlePhoneInput}
                  onFocus={() => trackField('phone', 'focus')}
                  onBlur={() => trackField('phone', 'blur')}
                  onChange={() => trackField('phone', 'input')}
                  placeholder="(555) 555-5555"
                  maxLength={14}
                  className={getInputStyles(errors.phone)}
                  aria-invalid={errors.phone ? "true" : "false"}
                  autoComplete="tel"
                />
                <ErrorMessage message={errors.phone?.message} />
              </div>
            </div>

            {/* Email and Restaurant Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  {...register("email")}
                  onFocus={() => trackField('email', 'focus')}
                  onBlur={() => trackField('email', 'blur')}
                  onChange={() => trackField('email', 'input')}
                  className={getInputStyles(errors.email)}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
              <div>
                <label htmlFor="restaurant" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  id="restaurant"
                  required
                  {...register("restaurant")}
                  onFocus={() => trackField('restaurant', 'focus')}
                  onBlur={() => trackField('restaurant', 'blur')}
                  onChange={() => trackField('restaurant', 'input')}
                  className={getInputStyles(errors.restaurant)}
                  aria-invalid={errors.restaurant ? "true" : "false"}
                />
                <ErrorMessage message={errors.restaurant?.message} />
              </div>
            </div>

            {/* City and State */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  onFocus={() => trackField('city', 'focus')}
                  onBlur={() => trackField('city', 'blur')}
                  onChange={() => trackField('city', 'input')}
                  className={getInputStyles(errors.city)}
                  aria-invalid={errors.city ? "true" : "false"}
                />
                <ErrorMessage message={errors.city?.message} />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  State
                </label>
                <select
                  id="state"
                  {...register("state")}
                  onFocus={() => trackField('state', 'focus')}
                  onBlur={() => trackField('state', 'blur')}
                  onChange={() => trackField('state', 'input')}
                  className={cn(
                    selectClasses,
                    getInputStyles(errors.state)
                  )}
                  aria-invalid={errors.state ? "true" : "false"}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ErrorMessage message={errors.state?.message} />
              </div>
            </div>

            {/* Instagram Link */}
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                Instagram Profile
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/60 dark:text-white/60" />
                <input
                  type="text"
                  id="instagram"
                  placeholder="@username"
                  {...register("instagram")}
                  onInput={handleInstagramInput}
                  onFocus={() => trackField('instagram', 'focus')}
                  onBlur={() => trackField('instagram', 'blur')}
                  onChange={() => trackField('instagram', 'input')}
                  className={cn(
                    getInputStyles(errors.instagram),
                    errors.instagram && "border-red-500 dark:border-red-500"
                  )}
                  aria-invalid={errors.instagram ? "true" : "false"}
                />
              </div>
            </div>

            {/* Other Social Media */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="socialPlatform" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  Other Social Media
                </label>
                <select
                  id="socialPlatform"
                  value={selectedSocialPlatform}
                  {...register("socialPlatform")}
                  onChange={(e) => {
                    setSelectedSocialPlatform(e.target.value);
                    trackField('socialPlatform', 'input');
                  }}
                  onFocus={() => trackField('socialPlatform', 'focus')}
                  onBlur={() => trackField('socialPlatform', 'blur')}
                  className={cn(
                    selectClasses,
                    getInputStyles(errors.socialPlatform)
                  )}
                  aria-invalid={errors.socialPlatform ? "true" : "false"}
                >
                  <option value="">Select Platform</option>
                  {socialPlatforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="socialLink" className="block text-sm font-medium text-secondary dark:text-white mb-2">
                  Profile Link/Username
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/60 dark:text-white/60" />
                  <input
                    type="text"
                    id="socialLink"
                    disabled={!selectedSocialPlatform}
                    placeholder={selectedSocialPlatform === 'Instagram' ? '@username' : 'Enter profile URL'}
                    onInput={handleSocialInput}
                    {...register("socialLink")}
                    onFocus={() => trackField('socialLink', 'focus')}
                    onBlur={() => trackField('socialLink', 'blur')}
                    onChange={() => trackField('socialLink', 'input')}
                    className={cn(
                      "w-full pl-10 pr-4 py-2 rounded-lg",
                      "bg-gray-50 dark:bg-gray-900/50",
                      "border border-gray-200 dark:border-gray-700",
                      "text-secondary dark:text-white",
                      "focus:ring-2 focus:ring-primary focus:border-transparent",
                      "transition-colors duration-200",
                      !selectedSocialPlatform && "opacity-50 cursor-not-allowed",
                      getInputStyles(errors.socialLink)
                    )}
                    aria-invalid={errors.socialLink ? "true" : "false"}
                  />
                </div>
                <ErrorMessage message={errors.socialLink?.message} />
              </div>
            </div>

            {/* Delivery Platforms */}
            <div>
              <label className="block text-sm font-medium text-secondary dark:text-white mb-3">
                Which online platforms do you use?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {deliveryPlatforms.map(platform => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handlePlatformToggle(platform)}
                    onFocus={() => trackField(platform, 'focus')}
                    onBlur={() => trackField(platform, 'blur')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm",
                      "border border-gray-200 dark:border-gray-700",
                      "transition-colors duration-200",
                      selectedPlatforms.includes(platform)
                        ? "bg-primary text-secondary border-primary"
                        : "bg-gray-50 dark:bg-gray-900/50 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    )}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label 
                htmlFor="comments" 
                className="block text-sm font-medium text-secondary dark:text-white mb-2"
              >
                Additional Comments
              </label>
              <textarea
                id="comments"
                {...register("comments")}
                rows={4}
                onFocus={() => trackField('comments', 'focus')}
                onBlur={() => trackField('comments', 'blur')}
                onChange={() => trackField('comments', 'input')}
                className={cn(
                  getInputStyles(errors.comments),
                  "resize-none"
                )}
                placeholder="Tell us more about your needs..."
                aria-invalid={errors.comments ? "true" : "false"}
              />
              <ErrorMessage message={errors.comments?.message} />
            </div>

            {/* Required Fields Note */}
            <p className="text-sm text-secondary/60 dark:text-white/60">
              * Name, Phone, Email, and Restaurant Name are required
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full px-6 py-3 rounded-lg",
                "bg-primary text-secondary",
                "hover:bg-primary/90",
                "transition-all duration-200",
                "font-medium",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "dark:focus:ring-offset-dark"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 