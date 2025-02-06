"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  TrendingUp,
  Trophy,
  Rocket,
  Target,
  Users
} from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    stat: "38%",
    title: "Digital Sales Growth",
    description: "Average increase in digital marketplace revenue for our partners"
  },
  {
    icon: Rocket,
    stat: "67%",
    title: "Faster Deployment",
    description: "Reduction in technology onboarding and implementation time"
  },
  {
    icon: Target,
    stat: "$7.2M",
    title: "Annual Sales",
    description: "Generated through optimized ghost kitchen operations"
  },
  {
    icon: Users,
    stat: "4.8",
    title: "Customer Rating",
    description: "Average satisfaction score across enterprise clients"
  },
  {
    icon: TrendingUp,
    stat: "245%",
    title: "Partnership Growth",
    description: "Increase in key strategic partnership acquisitions"
  }
];

interface LoyaltyProps {
  className?: string;
}

export function Loyalty({ className }: LoyaltyProps) {
  return (
    <section id="loyalty" className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary-500 dark:text-white mb-4">
            Proven Results
          </h2>
          <p className="text-secondary-500/80 dark:text-white/80">
            Our track record of success with small and medium-sized restaurants
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "p-6 rounded-lg text-center",
                "bg-white dark:bg-secondary-900/50",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-xl dark:hover:shadow-primary-500/10",
                "transform hover:-translate-y-1",
                "transition-all duration-300"
              )}
            >
              <item.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-primary-500 mb-2">{item.stat}</div>
              <h3 className="text-xl font-semibold text-secondary-500 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-secondary-500/80 dark:text-white/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 