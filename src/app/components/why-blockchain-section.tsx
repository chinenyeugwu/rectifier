"use client"

import { motion } from "framer-motion"
import { Shield, Database, Network, Lock } from "lucide-react"

export default function WhyBlockchainSection() {
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

  const highlightVariants = {
    initial: { backgroundSize: "0% 100%" },
    animate: {
      backgroundSize: "100% 100%",
      transition: { duration: 0.8, delay: 0.3 },
    },
  }

  // Feature cards data
  const features = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Enhanced Security",
      description: "Cryptographic techniques protect your data from unauthorized access and tampering attempts.",
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: "Decentralization",
      description: "No single point of failure means your data remains accessible and secure at all times.",
    },
    {
      icon: <Network className="w-10 h-10" />,
      title: "Transparent Ledger",
      description: "All transactions are recorded on a public ledger, ensuring complete transparency and traceability.",
    },
    {
      icon: <Lock className="w-10 h-10" />,
      title: "Immutable Records",
      description: "Once data is recorded, it cannot be altered retroactively, ensuring data integrity.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-950 mb-6">
            Why do you need blockchain technology?
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text explanation */}
          <motion.div
            className="space-y-6 text-lg"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={itemVariants} className="leading-relaxed text-gray-700">
              Blockchain uses cryptographic techniques to{" "}
              <motion.span
                className="font-semibold text-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-400 bg-no-repeat bg-bottom bg-[length:0%_2px] inline-block"
                variants={highlightVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                secure data and transactions
              </motion.span>
              , making it difficult for hackers to tamper with or forge records.
            </motion.p>

            <motion.p variants={itemVariants} className="leading-relaxed text-gray-700">
              Traditional systems often rely on a central authority to{" "}
              <motion.span
                className="font-semibold text-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-400 bg-no-repeat bg-bottom bg-[length:0%_2px] inline-block"
                variants={highlightVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                manage transactions and data
              </motion.span>
              , which can be prone to corruption or hacking.
            </motion.p>

            <motion.p variants={itemVariants} className="leading-relaxed text-gray-700">
              <motion.span
                className="font-semibold text-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-400 bg-no-repeat bg-bottom bg-[length:0%_2px] inline-block"
                variants={highlightVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                Blockchain technology
              </motion.span>{" "}
              distributes data across a network of computers, making it more secure and resistant to tampering.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="/rectify"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Get Started
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg inline-block mb-4">
                  <div className="text-emerald-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blockchain visualization */}
        <motion.div
          className="mt-20 relative h-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-16 h-16 mx-4 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-lg flex items-center justify-center shadow-sm">
                  <Lock className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="w-12 border-t-2 border-dashed border-emerald-200"></div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
