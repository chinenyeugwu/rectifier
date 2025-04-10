"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function ManageTransactionsSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Benefits list
  const benefits = [
    "Track all your transactions in real-time",
    "Secure multi-wallet integration",
    "Export transaction history with one click",
    "Detailed analytics and reporting",
    "Cross-chain transaction support",
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-800 to-teal-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute bottom-20 left-1/4 w-60 h-60 rounded-full bg-white/5"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white/10"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Manage your transactions in one place
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Every digital artwork on is authentic and truly unique. Blockchain technology makes this new approach to
              digital ownership possible.
            </p>
          </motion.div>

          {/* Banner image with glow effect */}
          <motion.div
            className="relative mb-16 mx-auto max-w-4xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glow effect behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl opacity-50 blur-xl"></div>

            {/* Image container with shadow and border */}
            <div className="relative rounded-xl overflow-hidden border border-emerald-200/20 shadow-2xl">
              <Image
                src="/banner.png"
                alt="Blockchain transaction management dashboard"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />

              {/* Floating badges */}
              <motion.div
                className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Live Dashboard
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 bg-white/90 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Secure Connection
              </motion.div>
            </div>
          </motion.div>

          {/* Benefits section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Left side - Benefits list */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-6">Platform Benefits</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="bg-emerald-400/20 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="w-5 h-5 text-emerald-300" />
                    </div>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div className="mt-8" variants={itemVariants}>
                {/* <a
                  href="/rectify"
                  className="inline-flex items-center z-10 px-6 py-3 bg-white text-emerald-800 font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a> */}
              </motion.div>
            </motion.div>

            {/* Right side - Stats */}
            <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
              {[
                { value: "2.5M+", label: "Transactions" },
                { value: "150K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/5 hover:bg-white/15 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-emerald-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
