"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

export default function CryptoTicker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
        )

        if (!response.ok) {
          throw new Error("Failed to fetch data from CoinGecko API")
        }

        const data = await response.json()
        setCryptoData(data)
        setLoading(false)
      } catch (err) {
        setError("Error fetching cryptocurrency data. CoinGecko API may have rate limits.")
        setLoading(false)
        console.error(err)
      }
    }

    fetchCryptoData()
  }, [])

  useEffect(() => {
    if (!scrollRef.current || loading || error) return

    const scrollContainer = scrollRef.current
    let animationId: number
    let position = 0

    const scroll = () => {
      position -= 0.5

      // Reset position when the first item is completely out of view
      if (position <= -120) {
        position = 0
      }

      if (scrollContainer) {
        scrollContainer.style.transform = `translateX(${position}px)`
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [loading, error])

  if (loading) {
    return (
      <div className="w-full bg-gray-900 text-white py-2 overflow-hidden">
        <div className="container mx-auto">
          <p className="text-center">Loading cryptocurrency data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full bg-gray-900 text-white py-2 overflow-hidden">
        <div className="container mx-auto">
          <p className="text-center">{error}</p>
        </div>
      </div>
    )
  }

  // Duplicate the data to create a seamless loop
  const extendedData = [...cryptoData, ...cryptoData]

  return (
    <div className="w-full bg-gray-900 text-white py-2 overflow-hidden">
      <div className="relative overflow-hidden">
        <div ref={scrollRef} className="flex items-center whitespace-nowrap" style={{ width: "fit-content" }}>
          {extendedData.map((crypto, index) => (
            <div key={`${crypto.id}-${index}`} className="flex items-center mx-3">
              <div className="flex items-center">
                <Image
                  src={crypto.image || "/placeholder.svg"}
                  alt={crypto.name}
                  width={20}
                  height={20}
                  className="rounded-full mr-2"
                />
                <span className="font-medium mr-1">{crypto.name}</span>
                <span className="text-gray-400 mr-2">({crypto.symbol.toUpperCase()})</span>
                <span className="font-medium mr-1">${crypto.current_price.toLocaleString()}</span>
                <span
                  className={`flex items-center ${
                    crypto.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {crypto.price_change_percentage_24h < 0 ? (
                    <ArrowDownRight size={16} className="inline" />
                  ) : (
                    <ArrowUpRight size={16} className="inline" />
                  )}
                  ({Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end pr-4">
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-gray-300"
        >
          Powered by CoinGecko
        </a>
      </div>
    </div>
  )
}
