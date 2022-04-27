import { ethers } from 'ethers'

import auroraAbi from '../../chain-info/abis/normalMoonriverAbi.json'
import { contractMappings } from '../../utils/constants'

export default async function handler(req, res) {
  const { useraddress } = req.query
  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://mainnet.aurora.dev',
    {
      chainId: 1313161554,
      name: 'Aurora'
    }
  )
  const activeVaultsTotalDeposited = {
    STABLES: 0,
    'STABLES-UST': 0,
    'STABLES-FRAX': 0,
    'STABLES-MAI': 0,
    'STABLES-BUSD': 0,
    'STABLES-RUSD': 0
  }
  for (const vault of Object.keys(activeVaultsTotalDeposited)) {
    var contract = new ethers.Contract(
      contractMappings['Aurora'][vault]['contract']['Vault'],
      auroraAbi,
      provider
    )
    const contractBalance = await contract.balanceOf(useraddress)

    let balance = parseInt(contractBalance) / 10 ** 18
    console.log(`Vault ${vault} and balance ${balance}`)

    activeVaultsTotalDeposited[vault] = balance
  }

  res.status(200).json({ activeVaultsTotalDeposited })
}
