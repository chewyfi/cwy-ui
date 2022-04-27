import { ethers } from 'ethers'
import { poolAddressesMoonriver } from 'src/chain-info/network-addreses/pool-addresses-moonriver'

import normalAbi from '../../chain-info/abis/normalMoonriverAbi.json'
const contractMappings = {
  MOVR: { contract: poolAddressesMoonriver['MoonbeamMOVR'], decimals: 18 },
  WETH: { contract: poolAddressesMoonriver['MoonbeamETH'], decimals: 18 },
  WBTC: {
    contract: poolAddressesMoonriver['MoonbeamBTCSupplyOnly'],
    decimals: 8
  },
  USDC: { contract: poolAddressesMoonriver['MoonbeamUSDC'], decimals: 6 },
  FRAX: { contract: poolAddressesMoonriver['MoonbeamFRAX'], decimals: 18 },
  USDT: { contract: poolAddressesMoonriver['MoonbeamUSDT'], decimals: 6 },
  '3POOL': {
    contract: poolAddressesMoonriver['Solarbeam3pool'],
    decimals: 18
  },
  FRAX3POOL: {
    contract: poolAddressesMoonriver['SolarbeamFrax3pool'],
    decimals: 18
  },
  'KSM-stKSM': {
    contract: poolAddressesMoonriver['SolarbeamstKSMpool'],
    decimals: 18
  }
}
const priceFeedMappings = {
  FRAX: 'FRAX',
  USDC: 'USDC',
  USDT: 'USDT',
  WBTC: 'bitcoin',
  WETH: 'ethereum',
  MOVR: 'moonriver',
  '3POOL': '3pool',
  FRAX3POOL: 'FRAX-3pool',
  'KSM-stKSM': 'KSM-pool'
}

export default async function handler(req, res) {
  const { vault } = req.query

  let resPriceFeed = await (
    await fetch('https://chewy-api.vercel.app/prices')
  ).json()

  if (Object.keys(resPriceFeed).length !== 10) {
    resPriceFeed = {
      bitcoin: 40425,
      ethereum: 3025.23,
      moonriver: 57.12,
      moonwell: 0.03929106,
      USDT: 1,
      USDC: 1,
      FRAX: 1,
      '3pool': 1,
      'FRAX-3pool': 1,
      'KSM-pool': 1
    }
    console.log('Having to use default prices')
  }

  let rpcUrl =
    'https://moonriver.blastapi.io/81297d7f-8827-4a29-86f1-a2dc3ffbf66b'
  const providerRPC = {
    moonriver: {
      name: 'moonriver',
      rpc: rpcUrl, // Insert your RPC URL here
      chainId: 1285 // 0x505 in hex,
    }
  }
  // 3. Create ethers provider
  const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.moonriver.rpc,
    {
      chainId: providerRPC.moonriver.chainId,
      name: providerRPC.moonriver.name
    }
  )

  let contract = new ethers.Contract(
    contractMappings[vault]['contract']['Vault'],
    normalAbi,
    provider
  )
  let balance =
    (parseInt(await contract.balance()) /
      10 ** contractMappings[vault]['decimals']) *
    resPriceFeed[priceFeedMappings[vault]]

  res.status(200).json({ info: { vault, balance } })
}
