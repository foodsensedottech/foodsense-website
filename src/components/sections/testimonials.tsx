"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Owner, Asian Fusion Restaurant",
    image: "/images/testimonials/sarah.jpg",
    content: "FoodSense transformed our digital presence. Our online orders increased by 45% in just three months!",
    rating: 5,
    platform: "Verified Customer"
  },
  {
    name: "Michael Rodriguez",
    role: "Manager, Mexican Grill Chain",
    image: "/images/testimonials/michael.jpg",
    content: "The loyalty program has been a game-changer. We're seeing more repeat customers and higher average order values.",
    rating: 5,
    platform: "Verified Customer"
  },
  {
    name: "Emma Thompson",
    role: "Owner, Farm-to-Table Restaurant",
    image: "/images/testimonials/emma.jpg",
    content: "Their analytics platform helped us optimize our menu and reduce waste. The ROI has been incredible.",
    rating: 5,
    platform: "Verified Customer"
  }
];

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  return (
    <section id="testimonials" className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-secondary/80 dark:text-white/80">
            Don't just take our word for it - hear from some of our satisfied customers
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "p-6 rounded-lg",
                "bg-white dark:bg-gray-900/50",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-2xl dark:hover:shadow-primary/10",
                "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                "transform hover:-translate-y-2",
                "transition-all duration-300 ease-out"
              )}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-primary fill-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-secondary/80 dark:text-white/80 mb-6">
                &ldquo;{testimonial.content.replace(/'/g, "&apos;")}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-secondary dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-secondary/60 dark:text-white/60">
                    {testimonial.name}&apos;s Restaurant
                  </div>
                  <div className="text-xs text-primary mt-1">
                    {testimonial.platform}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-secondary/80 dark:text-white/80 mb-4">
            Join hundreds of restaurants already growing with FoodSense
          </p>
          <a
            href="#contact"
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-3 rounded-lg",
              "bg-primary text-secondary",
              "hover:bg-primary/90",
              "transition-colors duration-200",
              "font-medium"
            )}
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  );
} 