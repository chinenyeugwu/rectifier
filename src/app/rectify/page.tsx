"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Define wallet data structure
type Wallet = {
  id: number
  name: string
  assetNumber: number
  isSpecial?: boolean
}

export default function ConnectWalletPage() {
  // State to track which wallets to display
  const [currentPage, setCurrentPage] = useState(0)
  const walletsPerPage = 12

  // Define all wallets
  const wallets: Wallet[] = [
    { id: 1, name: "Meta Mask", assetNumber: 0 },
    { id: 2, name: "Trust", assetNumber: 1 },
    { id: 3, name: "Solflare", assetNumber: 2 },
    { id: 4, name: "WalletConnect", assetNumber: 3 },
    { id: 5, name: "OTHER WALLETS", assetNumber: 4, isSpecial: true },
    { id: 6, name: "Terra", assetNumber: 5 },
    { id: 7, name: "Bitpay", assetNumber: 6 },
    { id: 8, name: "Maiar", assetNumber: 7 },
    { id: 9, name: "MyKey", assetNumber: 8 },
    { id: 10, name: "Atwallet", assetNumber: 9 },
    { id: 11, name: "Authereum", assetNumber: 10 },
    { id: 12, name: "Bifrost", assetNumber: 11 },
    { id: 13, name: "Binance Chain Wallet", assetNumber: 12 },
    { id: 14, name: "BitKeep", assetNumber: 13 },
    { id: 15, name: "Coinbase", assetNumber: 14 },
    { id: 16, name: "Coin98", assetNumber: 15 },
    { id: 17, name: "Crypto.com", assetNumber: 16 },
    { id: 18, name: "D'CENT", assetNumber: 17 },
    { id: 19, name: "Defiant", assetNumber: 18 },
    { id: 20, name: "Exodus", assetNumber: 19 },
    { id: 21, name: "Frame", assetNumber: 20 },
    { id: 22, name: "Huobi", assetNumber: 21 },
    { id: 23, name: "imToken", assetNumber: 22 },
    { id: 24, name: "Ledger Live", assetNumber: 23 },
    { id: 25, name: "MathWallet", assetNumber: 24 },
    { id: 26, name: "Phantom", assetNumber: 25 },
    { id: 27, name: "Rainbow", assetNumber: 26 },
    { id: 28, name: "SafePal", assetNumber: 27 },
    { id: 29, name: "Slope", assetNumber: 28 },
    { id: 30, name: "Sollet", assetNumber: 29 },
    { id: 31, name: "TokenPocket", assetNumber: 30 },
    { id: 32, name: "Trezor", assetNumber: 31 },
    { id: 33, name: "Torus", assetNumber: 32 },
    { id: 34, name: "Unstoppable Domains", assetNumber: 33 },
    { id: 35, name: "Venly", assetNumber: 34 },
    { id: 36, name: "Wallet.io", assetNumber: 35 },
    { id: 37, name: "Zelcore", assetNumber: 36 },
    { id: 38, name: "Brave", assetNumber: 37 },
    { id: 39, name: "XDEFI", assetNumber: 38 },
    { id: 40, name: "Rabby", assetNumber: 39 },
    { id: 41, name: "Sequence", assetNumber: 40 },
    { id: 42, name: "Frontier", assetNumber: 41 },
    { id: 43, name: "Enkrypt", assetNumber: 42 },
    { id: 44, name: "Zeal", assetNumber: 43 },
    { id: 45, name: "Argent", assetNumber: 44 },
    { id: 46, name: "Gnosis Safe", assetNumber: 45 },
    { id: 47, name: "Ambire", assetNumber: 46 },
    { id: 48, name: "Keplr", assetNumber: 47 },
    { id: 49, name: "Liquality", assetNumber: 48 },
    { id: 50, name: "Leap", assetNumber: 49 },
    { id: 51, name: "Cosmostation", assetNumber: 50 },
    { id: 52, name: "Clover", assetNumber: 51 },
    { id: 53, name: "Tokenary", assetNumber: 52 },
    { id: 54, name: "Infinity Wallet", assetNumber: 53 },
    { id: 55, name: "Taho", assetNumber: 54 },
    { id: 56, name: "OneKey", assetNumber: 55 },
    { id: 57, name: "Core", assetNumber: 56 },
    { id: 58, name: "Bitski", assetNumber: 57 },
  ]

  // Calculate total pages
  const totalPages = Math.ceil(wallets.length / walletsPerPage)

  // Get current wallets
  const currentWallets = wallets.slice(currentPage * walletsPerPage, (currentPage + 1) * walletsPerPage)

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
      // Scroll to top of wallet grid
      document.getElementById("wallet-grid")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-teal-800">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Connect Wallet
        </motion.h1>

        {/* Wallet grid */}
        <motion.div
          id="wallet-grid"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentWallets.map((wallet) => (
            <motion.div
              key={wallet.id}
              className="aspect-square"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (wallet.id * 0.03) % 0.5 }}
            >
              <Link
                href="/verification"
                className="block h-full bg-emerald-900 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-emerald-800 transition-colors duration-300"
              >
                <div className="mb-3 relative w-16 h-16 flex items-center justify-center">
                  <Image
                    src={`/asset ${wallet.assetNumber}.png`}
                    alt={wallet.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <span className={`text-white font-medium ${wallet.isSpecial ? "text-sm" : ""}`}>{wallet.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg disabled:opacity-50 hover:bg-emerald-600 transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === index
                      ? "bg-emerald-500 text-white"
                      : "bg-emerald-800 text-white hover:bg-emerald-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg disabled:opacity-50 hover:bg-emerald-600 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Help text */}
        <div className="mt-12 text-center">
          <p className="text-white/80 max-w-2xl mx-auto">
            Connect your wallet to access blockchain rectification services. If you don't see your wallet, check the
            other pages or contact support for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}
