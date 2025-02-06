"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Smartphone, 
  MessageSquare,
  Database,
  TrendingUp 
} from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Marketplace Optimization",
    description: "Strategic pricing and menu optimization for DoorDash, UberEats, and GrubHub to maximize visibility and profitability."
  },
  {
    icon: Users,
    title: "Operational Excellence",
    description: "Streamlined workflows and SOPs to eliminate order errors, improve speed of service, and boost customer satisfaction."
  },
  {
    icon: Smartphone,
    title: "Digital Integration",
    description: "Seamless integration with delivery platforms, POS systems, and enterprise management tools with 140% success rate."
  },
  {
    icon: MessageSquare,
    title: "Customer Retention",
    description: "Data-driven loyalty programs and promotional strategies to increase repeat purchases and lifetime value."
  },
  {
    icon: Database,
    title: "Data-Driven Growth",
    description: "Advanced analytics and market insights driving 245% growth in key partnership acquisitions and maintaining 4.8-star satisfaction."
  },
  {
    icon: TrendingUp,
    title: "Revenue Acceleration",
    description: "Proven track record of securing multimillion-dollar deals and driving significant revenue increases for enterprise restaurant groups."
  }
];

interface ServicesProps {
  className?: string;
}

export function Services({ className }: ServicesProps) {
  return (
    <section id="services" className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-secondary/80 dark:text-white/80">
            Comprehensive solutions to help your restaurant thrive in the digital age
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "p-6 rounded-lg",
                "bg-white dark:bg-gray-900/50",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-xl dark:hover:shadow-primary/10",
                "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                "transform hover:-translate-y-2",
                "transition-all duration-300 ease-out"
              )}
            >
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-secondary/80 dark:text-white/80">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 