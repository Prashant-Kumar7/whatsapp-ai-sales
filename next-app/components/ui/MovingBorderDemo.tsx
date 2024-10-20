


"use client";
import React from "react";
import { MovingBorderCard } from "@/components/ui/moving-border";
import { motion } from "framer-motion";
import { BarChart, Building, Clock, Lock } from "lucide-react";

export function MovingBorderDemo() {
  return (
  <div className="container mx-auto px-6">
    <h3 className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">
      B2B Benefits
    </h3>
    <div className="grid md:grid-cols-2 gap-12">
      {[
        {
          icon: Clock,
          title: "Time Efficiency",
          description:
            "Automate responses to save valuable time for your team.",
        },
        {
          icon: Building,
          title: "Scalable Solution",
          description:
            "Grow your business without proportionally increasing support costs.",
        },
        {
          icon: Lock,
          title: "Enhanced Security",
          description:
            "Ensure data protection with enterprise-grade security measures.",
        },
        {
          icon: BarChart,
          title: "Improved Conversion",
          description:
            "Increase sales with timely and relevant customer interactions.",
        },
        ].map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className=""
          >
          <MovingBorderCard
            borderRadius=""
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <benefit.icon className="w-10 h-10 mr-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />            
                <div>
                  <h4 className="text-xl text-left font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-left dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
          </MovingBorderCard>
          </motion.div>
              ))}
    </div>

    </div>
  );
}
