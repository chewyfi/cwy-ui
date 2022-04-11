import { ethers } from 'ethers'

import normalAbi from '../../chain-info/abis/normalAbi.json'
import { poolAddresses } from '../../chain-info/pool-addresses'

const contractMappings = {
  MOVR: { contract: poolAddresses['MoonbeamMOVR'], decimals: 18 },
  WETH: { contract: poolAddresses['MoonbeamETH'], decimals: 18 },
  WBTC: { contract: poolAddresses['MoonbeamBTCSupplyOnly'], decimals: 8 },
  USDC: { contract: poolAddresses['MoonbeamUSDC'], decimals: 6 },
  FRAX: { contract: poolAddresses['MoonbeamFRAX'], decimals: 18 },
  USDT: { contract: poolAddresses['MoonbeamUSDT'], decimals: 6 },
  solar3POOL: { contract: poolAddresses['Solarbeam3pool'], decimals: 18 },
  solar3FRAX: { contract: poolAddresses['SolarbeamFrax3pool'], decimals: 18 },
  solarstKSM: { contract: poolAddresses['SolarbeamstKSMpool'], decimals: 18 }
}

export default async function handler(req, res) {
  const { address } = req.query
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

  const activeVaultsTotalDeposited = {
    MOVR: 'NaN',
    WETH: 'NaN',
    WBTC: 'NaN',
    USDC: 'NaN',
    USDT: 'NaN',
    FRAX: 'NaN',
    solar3POOL: 'NaN',
    solar3FRAX: 'NaN',
    solarstKSM: 'NaN'
  }

  for (const vault of Object.keys(activeVaultsTotalDeposited)) {
    var contract = new ethers.Contract(
      contractMappings[vault]['contract']['Vault'],
      normalAbi,
      provider
    )
    let balance =
      parseInt(await contract.balanceOf(address)) /
      10 ** contractMappings[vault]['decimals']
    activeVaultsTotalDeposited[vault] = balance
  }

  res.status(200).json({ activeVaultsTotalDeposited })
}
