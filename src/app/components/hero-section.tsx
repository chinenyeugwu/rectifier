"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-600 min-h-[90vh] flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute bottom-20 left-1/4 w-60 h-60 rounded-full bg-white/5"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white/10"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center">
        {/* Left content */}
        <div className="w-full lg:w-1/2 z-10 mb-12 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Make your life easier
            <span className="block">with blockchain</span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-xl mb-8">
            Open decentralized and centralized protocol for syncing various Wallets issues on Secure Server. It is an
            online server which gets you across to every wallet representative to enable effective complain and
            rectification of issues.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/rectify"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-emerald-800 transition-all duration-300"
            >
              Connect Wallet
            </Link>
            <Link
              href="/rectify"
              className="px-8 py-4 bg-white text-emerald-800 font-medium rounded-lg hover:bg-opacity-90 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right floating image */}
        <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="relative w-full max-w-md"
          >
            <Image
              src="/floating.webp"
              alt="Blockchain mobile application"
              width={600}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />

            {/* Decorative elements around the image */}
            <motion.div
              className="absolute -z-10 w-32 h-32 rounded-full bg-cyan-500/20 blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{ top: "10%", right: "10%" }}
            />
            <motion.div
              className="absolute -z-10 w-24 h-24 rounded-full bg-emerald-400/20 blur-xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              style={{ bottom: "15%", left: "5%" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
