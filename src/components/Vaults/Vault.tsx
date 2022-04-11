import clsx from 'clsx'
import React, { useEffect } from 'react'
import { APYType } from 'src/types'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDC_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from 'src/utils/constants'
import { useAccount, useBalance, useContractRead, useProvider } from 'wagmi'

import nativeAbi from '../../chain-info/abis/nativeAbi.json'
import normalAbi from '../../chain-info/abis/normalAbi.json'
import { poolAddresses } from '../../chain-info/pool-addresses'
import { Spinner } from '../ui/Spinner'

interface Props {
  item: APYType
  toggleDisclosure: () => void
  resPriceFeed: any
  resApyList: any
}
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

const priceFeedMappings: any = {
  FRAX: 'FRAX',
  USDC: 'USDC',
  USDT: 'USDT',
  WBTC: 'bitcoin',
  WETH: 'ethereum',
  MOVR: 'moonriver',
  solar3POOL: '3pool',
  solar3FRAX: 'FRAX-3pool',
  solarstKSM: 'KSM-pool'
}

const apyMappings: any = {
  USDC: 'moonwell-usdc-leverage',
  MOVR: 'moonwell-movr-leverage',
  USDT: 'moonwell-usdt-leverage',
  WETH: 'moonwell-eth-leverage',
  FRAX: 'moonwell-frax-leverage',
  WBTC: 'moonwell-btc-supply'
}

export const Vault: React.FC<Props> = ({
  item,
  toggleDisclosure,
  resPriceFeed,
  resApyList
}) => {
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

  useEffect(() => {
    console.log('VAULT PROPS ITEM', item)
  }, [account?.address])

  const getBalance = (token: string) => {
    switch (token) {
      case 'MOVR':
        return movr?.formatted
      case 'WETH':
        return weth?.formatted
      case 'WBTC':
        return wbtc?.formatted
      case 'USDC':
        let numUSDC = parseFloat(usdc?.formatted || '0') * 10 ** 12
        return numUSDC.toString()
      case 'FRAX':
        return frax?.formatted
      case 'USDT':
        let numUSDT = parseFloat(usdt?.formatted || '0') * 10 ** 12
        return numUSDT.toString()
      case 'solar3POOL':
        return threePool?.formatted
      case 'solar3FRAX':
        return frax3Pool?.formatted
      case 'solarstKSM':
        return solarstKSM?.formatted
    }
  }
  // const [{ data: balanceDataUnformatted, loading: loadingBalanceUser }] =
  //   useContractRead(
  //     {
  //       addressOrName: contractMappings[item.name]['contract']['Vault'],
  //       contractInterface:
  //         contractMappings[item.name] !== 'MOVR' ? normalAbi : nativeAbi,
  //       signerOrProvider: provider
  //     },
  //     'balanceOf',
  //     {
  //       args: [account?.address]
  //     }
  //   )

  // console.log(`Item name ${item.name} and balance ${balanceDataUnformatted}`)

  const [{ data: totalValueData, loading: loadingTotalValue }] =
    useContractRead(
      {
        addressOrName: contractMappings[item.name]['contract']['Vault'],
        contractInterface:
          contractMappings[item.name] !== 'MOVR' ? normalAbi : nativeAbi,
        signerOrProvider: provider
      },
      'balance'
    )

  return (
    <div
      className={clsx('py-3 px-2 rounded-lg bg-[#f7f7f7] hover:bg-[#f0f0f0]')}
    >
      <div
        onClick={() => toggleDisclosure()}
        className="flex items-center w-full font-medium cursor-pointer"
      >
        <span className="flex items-center w-2/4 space-x-2">
          <img
            alt=""
            draggable={false}
            className="w-8 h-8 mx-3"
            src={item.icon}
          />
          <div className="flex flex-col">
            <span className="text-[15px] -mb-0.5 flex space-x-2">
              {item.name}
              {item.getSomeUrl && (
                <a
                  className="ml-2 text-[15px] text-[#c0c0c0] underline"
                  href={item.getSomeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  get some
                </a>
              )}
            </span>
            <span className="font-normal text-[14px] text-[#c0c0c0]">
              {item.strategy}
            </span>
            <span className="text-[14px] text-[#c0c0c0]">
              <span className="flex items-center font-normal">
                <span className="mr-1">TVL $</span>
                {loadingTotalValue ? (
                  <Spinner size="xs" />
                ) : totalValueData ? (
                  (
                    ((totalValueData as any) *
                      resPriceFeed[priceFeedMappings[item.name]])! /
                    10 ** contractMappings[item.name]['decimals']
                  )?.toFixed(2)
                ) : (
                  <Spinner size="xs" />
                )}
              </span>
            </span>
          </div>
        </span>
        <span className="text-[17px] ml-6 w-1/3 font-normal">
          {(parseFloat(resApyList[apyMappings[item.name]]) * 100).toFixed(2)}%
        </span>
        <span className="flex mr-1 font-normal items-end flex-col w-1/3 px-2 text-[17px] text-[#c0c0c0]">
          <span>
            {!getBalance(item.name) ? (
              <Spinner />
            ) : (
              parseFloat(getBalance(item.name)!).toFixed(2)
            )}
          </span>

          {/* <span>
            {loadingBalanceUser ? (
              <Spinner />
            ) : balanceDataUnformatted ? (
              (
                (balanceDataUnformatted as any) /
                10 ** contractMappings[item.name]['decimals']
              ).toFixed(2)
            ) : (
              <Spinner />
            )}
          </span> */}
        </span>
      </div>
    </div>
  )
}
