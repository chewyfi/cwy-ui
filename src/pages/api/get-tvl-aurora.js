import { ethers } from 'ethers'

import auroraAbi from '../../chain-info/abis/normalMoonriverAbi.json'
import { contractMappings } from '../../utils/constants'
const vaultMappings = {
  STABLES: contractMappings['Aurora']['STABLES']['contract']['Vault'],
  'STABLES-MAI': contractMappings['Aurora']['STABLES-MAI']['contract']['Vault'],
  'STABLES-FRAX':
    contractMappings['Aurora']['STABLES-FRAX']['contract']['Vault'],
  'STABLES-UST': contractMappings['Aurora']['STABLES-UST']['contract']['Vault'],
  'STABLES-BUSD':
    contractMappings['Aurora']['STABLES-BUSD']['contract']['Vault'],
  'STABLES-RUSD':
    contractMappings['Aurora']['STABLES-RUSD']['contract']['Vault']
}

export default async function handler(req, res) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://mainnet.aurora.dev',
    {
      chainId: 1313161554,
      name: 'Aurora'
    }
  )

  let sum = 0
  for (const vault of Object.keys(vaultMappings)) {
    let contract = new ethers.Contract(
      vaultMappings[vault],
      auroraAbi,
      provider
    )
    sum += parseInt(await contract.balance()) / 10 ** 18
  }

  res.status(200).json({ sum })
}
