import React, { useState } from 'react'
import { useAccount, useBalance, useContractWrite, useProvider } from 'wagmi'

import nativeAbi from '../../chain-info/abis/nativeAbi.json'
import normalAbi from '../../chain-info/abis/normalAbi.json'
import { poolAddresses } from '../../chain-info/pool-addresses'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDC_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from '../../utils/constants'
import { Alert } from '../ui/Alert'

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
    token: USDC_TOKEN_CONTRACT,
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
        return parseFloat(usdc?.formatted || '0') * 10 ** 12
      case 'FRAX':
        return frax?.formatted
      case 'USDT':
        return parseFloat(usdt?.formatted || '0') * 10 ** 12
      case 'solar3POOL':
        return threePool?.formatted
      case 'solar3FRAX':
        return frax3Pool?.formatted
      case 'solarstKSM':
        return solarstKSM?.formatted
    }
  }
  const [{}, writeApprove] = useContractWrite(
    {
      addressOrName: contractMappings[name]['contract']['Want'],
      contractInterface:
        contractMappings[name] !== 'MOVR' ? normalAbi : nativeAbi,
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

  const [{ data, error, loading }, writeDeposit] = useContractWrite(
    {
      addressOrName: contractMappings[name]['contract']['Vault'],
      contractInterface:
        contractMappings[name] !== 'MOVR' ? normalAbi : nativeAbi,
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

  console.log(`
  data ${JSON.stringify(data)} Error data ${error} loading data ${loading}`)

  const withdrawAll = async () => {
    await writeWithdrawAll()
  }

  const [{}, writeWithdrawAll] = useContractWrite(
    {
      addressOrName: contractMappings[name]['contract']['Vault'],
      contractInterface:
        contractMappings[name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'withdrawAll'
  )

  const approve = async () => {
    console.log('APPROVE CLICKED')
    await writeApprove()
    await writeDeposit()
  }

  return (
    <>
      {error ? <Alert errorMessage={error.message} /> : null}
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
              onChange={(e) =>
                !isNaN(parseFloat(e.target.value))
                  ? setDepositAmount(e.target.value)
                  : 0
              }
              className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
            />

            <button
              onClick={() => withdrawAll()}
              className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none"
            >
              max
            </button>
          </div>
          <button
            onClick={() => approve()}
            className="inline-block w-full p-1 mt-1 text-white bg-black border-2 border-black rounded-lg"
          >
            Approve & Deposit
          </button>
        </div>
        <div className="mt-1 mb-3 text-gray-500">
          <label className="mb-1 text-[11px]">Deposited: 0</label>
          <div className="flex items-center text-[12px]">
            <input
              step="0.01"
              min="0"
              value={withdrawAmount}
              type="number"
              onChange={(e) =>
                !isNaN(parseFloat(e.target.value))
                  ? setWithdrawAmount(e.target.value)
                  : 0
              }
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
    </>
  )
}
