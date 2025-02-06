"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

const platforms = [
  { 
    name: "UberEats", 
    src: "/logos/uber-eats.svg",
    width: 120,
    height: 40
  },
  { 
    name: "DoorDash", 
    src: "/logos/doordash-logo.svg",
    width: 120,
    height: 40
  },
  { 
    name: "Grubhub", 
    src: "/logos/grubhub-logo.svg",
    width: 120,
    height: 40
  },
  { 
    name: "Lightspeed POS", 
    src: "/logos/lightspeed.svg",
    width: 120,
    height: 40
  },
  { 
    name: "Square", 
    src: "/logos/square.svg",
    width: 100,
    height: 100
  },
  { 
    name: "ezCater", 
    src: "/logos/EzCater_idDO5kbylz_0.svg",
    width: 120,
    height: 40
  }
];

interface IntegrationsProps {
  className?: string;
}

export function Integrations({ className }: IntegrationsProps) {
  return (
    <section id="integrations" className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
            Integrated with Leading Platforms
          </h2>
          <p className="text-secondary/80 dark:text-white/80">
            Seamlessly connect with the platforms your customers already use
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
            "gap-8 items-center justify-items-center",
            "max-w-5xl mx-auto"
          )}
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className={cn(
                "relative h-16",
                "grayscale hover:grayscale-0",
                "opacity-75 hover:opacity-100",
                "transition-all duration-300",
                "transform hover:scale-105"
              )}
            >
              <Image
                src={platform.src}
                alt={`${platform.name} logo`}
                width={platform.width}
                height={platform.height}
                className="object-contain w-auto h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 