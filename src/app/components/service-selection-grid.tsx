"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Package,
  Shield,
  RotateCcw,
  Wallet,
  QrCode,
  ArrowRightLeft,
  Droplet,
  BarChart2,
  Scale,
  TrendingUp,
  AlertTriangle,
  AlertOctagon,
  Repeat,
  Layers,
  RefreshCw,
  Gift,
  ImageIcon,
  AlertCircle,
  FileText,
  Clock,
  Lock,
  CreditCard,
  XCircle,
  HelpCircle,
} from "lucide-react"

// Service card type definition
type ServiceCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  color?: string
}

// Service card component
const ServiceCard = ({ icon, title, description, color = "emerald" }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
      className={`bg-white rounded-lg p-5 transition-all duration-300 h-full flex flex-col border-t-4 ${
        color === "emerald" ? "border-emerald-500" : "border-teal-400"
      }`}
    >
      <Link href="/rectify" className=" z-10 flex flex-col h-full group">
        <div
          className={`p-2 rounded-lg w-12 h-12 flex items-center justify-center mb-3 ${
            color === "emerald" ? "bg-emerald-50 text-emerald-600" : "bg-teal-50 text-teal-600"
          }`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-emerald-900 mb-2 group-hover:text-emerald-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mt-auto">{description}</p>
      </Link>
    </motion.div>
  )
}

export default function ServiceSelectionGrid() {
  // All services data
  const services = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Migration Issues",
      description: "Click here for migration related issues",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Assets Recovery",
      description: "Click here for Assets Recovery issues",
      color: "teal",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Rectification",
      description: "Click here for Rectification issues",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Withdraw Funds",
      description: "Click here for withdrawal issues",
      color: "teal",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "Connect Wallet to App",
      description: "Click here for wallet to app connection issues",
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6" />,
      title: "Bridge Token",
      description: "Click here for bridge token issues",
      color: "teal",
    },
    {
      icon: <Droplet className="w-6 h-6" />,
      title: "Liquidity",
      description: "Click here for liquidity issues",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Staking Balance",
      description: "Click here for staking balance issues",
      color: "teal",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "View Value of Token",
      description: "Click here to view value of tokens",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "High Gas Fees",
      description: "Click here for Gas Fees issues",
      color: "teal",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Slippage Error",
      description: "Click here for Slippage Error issues",
    },
    {
      icon: <AlertOctagon className="w-6 h-6" />,
      title: "Transaction Error",
      description: "Click here for Transaction Error issues",
      color: "teal",
    },
    {
      icon: <Repeat className="w-6 h-6" />,
      title: "Cross Chain Transfer",
      description: "Click here for Cross Chain issues",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Staking Issues",
      description: "Click here for Staking issues",
      color: "teal",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Swap/Exchange",
      description: "Click here for Swap/Exchange issues",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Claim Airdrop",
      description: "Click here for Claim Airdrop issues",
      color: "teal",
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "NFTs Issues",
      description: "Click here for NFTS issues",
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Missing/Irregular Balance",
      description: "Click to recover Lost/Irregular Balance",
      color: "teal",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Whitelist Issues",
      description: "Click here for whitelist related issues",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Transaction Delay",
      description: "Click here for Transaction Delay issues",
      color: "teal",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Locked Account",
      description: "Click here for Locked Account issues",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Trading Wallet Issues",
      description: "Click here if you have problem with your trading wallet",
      color: "teal",
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "Unable To Buy Coins/Tokens",
      description: "To trade crypto your account must be marked as a trusted payment source",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Other Issues Not Listed",
      description: "If you can't find the issue you are experiencing click here",
      color: "teal",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute bottom-20 left-1/4 w-60 h-60 rounded-full bg-white/5"></div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Make Your Selection Below</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Service grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 1), duration: 0.5 }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  color={service.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
