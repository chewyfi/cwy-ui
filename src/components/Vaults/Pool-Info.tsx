import React, { useState } from 'react'
import { useAccount, useBalance, useContractWrite, useProvider } from 'wagmi'

import normalAbi from '../../chain-info/abis/normalAbi.json'
import { poolAddresses } from '../../chain-info/pool-addresses'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from '../../utils/constants'

const contractMappings: any = {
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

interface Props {
  name: string
}

export const PoolInfo: React.FC<Props> = ({ name }) => {
  const [depositAmount, setDepositAmount] = useState('1.0')
  const [withdrawAmount, setWithdrawAmount] = useState('1.0')
  const provider = useProvider()
  const [{ data: account }] = useAccount()
  console.log('ACCOUNT ', account)
  console.log('NAME ', name)

  const [{ data: movr }] = useBalance({
    addressOrName: account?.address
  })
  const [{ data: weth }] = useBalance({
    token: WETH_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: wbtc }] = useBalance({
    token: WBTC_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: usdc }] = useBalance({
    token: WBTC_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: usdt }] = useBalance({
    token: USDT_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: frax }] = useBalance({
    token: FRAX_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: threePool }] = useBalance({
    token: THREE_POOL_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: frax3Pool }] = useBalance({
    token: FRAX_3POOL_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: solarstKSM }] = useBalance({
    token: TWO_KSM_TOKEN_CONTRACT,
    addressOrName: account?.address
  })

  const getBalance = (token: string) => {
    switch (token) {
      case 'MOVR':
        return movr?.formatted
      case 'WETH':
        return weth?.formatted
      case 'WBTC':
        return wbtc?.formatted
      case 'USDC':
        return usdc?.formatted
      case 'FRAX':
        return frax?.formatted
      case 'USDT':
        return usdt?.formatted
      case 'solar3POOL':
        return threePool?.formatted
      case 'solar3FRAX':
        return frax3Pool?.formatted
      case 'solarstKSM':
        return solarstKSM?.formatted
    }
  }
  console.log('CONTRACT AT NAME ', contractMappings[name]['contract'])
  const [{ data, error, loading }, writeApprove] = useContractWrite(
    {
      addressOrName: contractMappings[name]['contract']['Want'],
      contractInterface: normalAbi,
      signerOrProvider: provider
    },
    'approve',
    {
      args: [
        contractMappings[name]['contract']['Vault'],
        BigInt(
          parseFloat(depositAmount) * 10 ** contractMappings[name]['decimals']
        )
      ]
    }
  )

  const [{}, writeDeposit] = useContractWrite(
    {
      addressOrName: contractMappings[name]['contract']['Vault'],
      contractInterface: normalAbi,
      signerOrProvider: provider
    },
    'deposit',
    {
      args: [
        BigInt(
          parseFloat(depositAmount) * 10 ** contractMappings[name]['decimals']
        )
      ]
    }
  )

  const withdrawAll = async () => {
    await writeWithdrawAll()
  }

  const [{}, writeWithdrawAll] = useContractWrite(
    {
      addressOrName: contractMappings[name]['contract']['Vault'],
      contractInterface: normalAbi,
      signerOrProvider: provider
    },
    'withdrawAll'
  )

  console.log(`Data ${data} Error ${error} loading ${loading}`)

  const approve = async () => {
    await writeApprove()
    await writeDeposit()
  }

  return (
    <div className="flex space-x-2">
      <div className="mt-1 mb-3 text-gray-500">
        <label className="mb-1 text-[11px]">
          Balance: {getBalance(name)} LP
        </label>
        <div className="flex items-center text-[12px]">
          <input
            value={depositAmount}
            type="number"
            step="0.1"
            min="0"
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
          />
          <button className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
            max
          </button>
        </div>
        <button
          onClick={() => approve()}
          className="inline-block w-full p-1 mt-1 text-white bg-black border-2 border-black rounded-lg"
        >
          Approve
        </button>
      </div>
      <div className="mt-1 mb-3 text-gray-500">
        <label className="mb-1 text-[11px]">Deposited: 0</label>
        <div className="flex items-center text-[12px]">
          <input
            step="0.01"
            min="0"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            type="number"
            className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
          />
          <button className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
            max
          </button>
        </div>
        <button
          onClick={withdrawAll}
          className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded-lg"
        >
          Withdraw
        </button>
      </div>
    </div>
  )
}
