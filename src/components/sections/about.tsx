"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Target, 
  TrendingUp,
  ChartBar,
  Users,
  Cog
} from "lucide-react";

const features = [
  {
    icon: ChartBar,
    title: "Proven Results",
    description: "38% average growth in digital sales and 64% increase in delivery revenue for our restaurant partners."
  },
  {
    icon: Rocket,
    title: "Optimization and Profits",
    description: "Reduce technology deployment time by 67% with our streamlined onboarding process."
  },
  {
    icon: Target,
    title: "Enterprise Solutions",
    description: "Successfully deployed across 1,500+ locations with major franchises and restaurant groups."
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "8+ years of experience in restaurant technology and strategic partnerships, maintaining a 4.8-star satisfaction rating."
  },
  {
    icon: Cog,
    title: "Full Integration",
    description: "Seamless integration with major POS systems and delivery platforms like DoorDash, UberEats, and GrubHub."
  },
  {
    icon: TrendingUp,
    title: "Growth Focus",
    description: "Proven track record of scaling ghost kitchens and digital operations, generating millions in annual sales."
  }
];

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  return (
    <section id="about" className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-secondary-500 dark:text-white mb-6">
            About FoodSense
          </h2>
          <p className="text-lg text-secondary-500/80 dark:text-white/80 mb-12">
            We help independent restaurants thrive in the digital age by providing smart, integrated solutions that streamline operations and boost growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "p-6 rounded-lg",
                "bg-white dark:bg-secondary-900/50",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-xl dark:hover:shadow-primary-500/10",
                "transform hover:-translate-y-1",
                "transition-all duration-300"
              )}
            >
              <feature.icon className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-secondary-500 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary-500/80 dark:text-white/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 