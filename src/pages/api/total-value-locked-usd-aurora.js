import { ethers } from 'ethers'

import auroraAbi from '../../chain-info/abis/normalAbi.json'
import { contractMappings } from '../../utils/constants'
const vaultMappings = {
  'ROSE-STABLES':
    contractMappings['Aurora']['ROSE-STABLES']['contract']['Vault'],
  'MAI-STABLES': contractMappings['Aurora']['MAI-STABLES']['contract']['Vault'],
  'FRAX-STABLES':
    contractMappings['Aurora']['FRAX-STABLES']['contract']['Vault'],
  'UST-STABLES': contractMappings['Aurora']['UST-STABLES']['contract']['Vault'],
  'BUSD-STAPLES':
    contractMappings['Aurora']['BUSD-STAPLES']['contract']['Vault'],
  'ROSE-RUSD': contractMappings['Aurora']['ROSE-RUSD']['contract']['Vault']
}

export default async function handler(req, res) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://mainnet.aurora.dev',
    {
      chainId: 1313161554,
      name: 'Aurora'
    }
  )

  const activeVaultsTotalValueLocked = {}
  for (const vault of Object.keys(vaultMappings)) {
    let contract = new ethers.Contract(
      vaultMappings[vault],
      auroraAbi,
      provider
    )
    let balance = parseInt(await contract.balance()) / 10 ** 18
    activeVaultsTotalValueLocked[vault] = balance
  }

  res.status(200).json({ activeVaultsTotalValueLocked })
}
