import React, { useEffect, useState } from 'react'

export function App() {
  type cryptoType = {
    id: string
    rank: number
    symbol: string
    name: string
    supply: number
    maxSupply: number
    marketCapUsd: number
    volumeUsd24Hr: number
    priceUsd: number
    changePercent24Hr: number
    vwap24Hr: number
    explorer: string
  }

  const [cryptoData, setCryptoData] = useState<cryptoType[]>([])

  function loadData() {
    async function fetchData() {
      const response = await fetch('https://api.coincap.io/v2/assets')

      if (response.ok) {
        const json = await response.json()
        setCryptoData(json.data)
        console.log(json.data)
      }
    }

    fetchData()
  }

  useEffect(loadData, [])

  useEffect(function () {
    setInterval(loadData, 10000)
  }, [])

  return (
    <div>
      <header>Crypto Ticker</header>
      <ul>
        {cryptoData.map((crypto) => {
          return (
            <li key={crypto.id}>
              {crypto.id}: ${Math.round(crypto.priceUsd * 100) / 100}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
