import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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

const accountMappings: any = {
  WETH: WETH_TOKEN_CONTRACT,
  MOVR: null,
  WBTC: WBTC_TOKEN_CONTRACT,
  USDC: USDC_TOKEN_CONTRACT,
  USDT: USDT_TOKEN_CONTRACT,
  FRAX: FRAX_TOKEN_CONTRACT,
  solar3FRAX: FRAX_3POOL_TOKEN_CONTRACT,
  solarstKSM: TWO_KSM_TOKEN_CONTRACT,
  solar3POOL: THREE_POOL_TOKEN_CONTRACT
}

export const Vault: React.FC<Props> = ({
  item,
  toggleDisclosure,
  resPriceFeed,
  resApyList
}) => {
  const provider = useProvider()
  const router = useRouter()
  const [deposited, setDeposited] = useState(0)

  const [{ data: account }] = useAccount()

  const [{ data: metaMaskBalance }] = useBalance({
    token: accountMappings[item.name],
    addressOrName: account?.address
  })

  console.log('META MASK BALANCE ', metaMaskBalance)

  const formatMetaMaskBalance = (token: any) => {
    if (token && (token.symbol === 'USDC' || token.symbol === 'USDT')) {
      return (parseFloat(token.formatted) * 10 ** 12).toFixed(2)
    }
    return parseFloat(token?.formatted).toFixed(2)
  }

  useEffect(() => {
    if (account?.address) {
      const getDeposited = async () => {
        const { basePath: baseURL } = router
        const { deposited } = await (
          await fetch(
            `${baseURL}/api/deposited?vault=${item.name}&useraddress=${account.address}`
          )
        ).json()

        setDeposited(deposited)
        console.log('Vault deposited ', deposited)
      }
      getDeposited()
    }
  }, [account?.address])

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
          {item.tvl
            ? item.tvl
            : `${(parseFloat(resApyList[apyMappings[item.name]]) * 100).toFixed(
                2
              )}%`}
        </span>
        <span className="flex mr-1 font-normal items-end flex-col w-1/3 px-2 text-[17px] text-[#c0c0c0]">
          <span>
            {metaMaskBalance?.formatted
              ? formatMetaMaskBalance(metaMaskBalance)
              : null}
          </span>

          <span>{deposited.toFixed(2)}</span>
        </span>
      </div>
    </div>
  )
}
