import { ethers } from 'ethers'

import auroraAbi from '../../chain-info/abis/normalAbi.json'
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
    'ROSE-STABLES': 0,
    'UST-STABLES': 0,
    'FRAX-STABLES': 0,
    'MAI-STABLES': 0,
    'BUSD-STAPLES': 0,
    'ROSE-RUSD': 0
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
