import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { UPDATE_APY, UPDATE_DEPOSITED, UPDATE_TVL } from 'src/context/actions'
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
import { contractMappings } from 'src/utils/constants'
import { apyMappings } from 'src/utils/constants'
import { aprToApy, formatMetaMaskBalance } from 'src/utils/helpers'
import { useAccount, useBalance, useContractRead, useProvider } from 'wagmi'

import nativeAbi from '../../../chain-info/abis/nativeMoonriverAbi.json'
import normalAbi from '../../../chain-info/abis/normalMoonriverAbi.json'
import { AppContext } from '../../../context/index'
interface Props {
  item: APYType
  toggleDisclosure: () => void
  resPriceFeed: any
  resApyList: any
  index: any
}

const accountMappings: any = {
  WETH: WETH_TOKEN_CONTRACT,
  MOVR: null,
  WBTC: WBTC_TOKEN_CONTRACT,
  USDC: USDC_TOKEN_CONTRACT,
  USDT: USDT_TOKEN_CONTRACT,
  FRAX: FRAX_TOKEN_CONTRACT,
  FRAX3POOL: FRAX_3POOL_TOKEN_CONTRACT,
  'KSM-stKSM': TWO_KSM_TOKEN_CONTRACT,
  '3POOL': THREE_POOL_TOKEN_CONTRACT
}

export const MoonriverVault: React.FC<Props> = ({
  item,
  toggleDisclosure,
  resPriceFeed,
  resApyList,
  index
}) => {
  const { dispatch } = useContext(AppContext)
  const provider = useProvider()
  const router = useRouter()
  const [deposited, setDeposited] = useState(0)
  const [tvl, setTVL] = useState(0)

  const [{ data: account }] = useAccount()

  const [{ data: metaMaskBalance }] = useBalance({
    token: accountMappings[item.name],
    addressOrName: account?.address
  })

  useEffect(() => {
    const TVLFetch = async () => {
      const { basePath: baseURL } = router

      const { info } = await (
        await fetch(
          `${baseURL}/api/total-value-locked-usd-vault?vault=${item.name}`
        )
      ).json()

      setTVL(info.balance)
      dispatch({
        type: UPDATE_TVL,
        payload: {
          tvl: info.balance,
          network: 'apysMoonriver',
          vault: item.name
        }
      })
      // set context TVL
    }
    TVLFetch()
    if (account?.address) {
      const getDeposited = async () => {
        const { basePath: baseURL } = router
        const { deposited } = await (
          await fetch(
            `${baseURL}/api/user-deposited?vault=${item.name}&useraddress=${account.address}`
          )
        ).json()
        setDeposited(deposited)
        deposited &&
          dispatch({
            type: UPDATE_DEPOSITED,
            payload: {
              deposited: deposited,
              network: 'apysMoonriver',
              vault: item.name
            }
          })
      }
      getDeposited()
    }
    dispatch({
      type: UPDATE_APY,
      payload: {
        apy: resApyList[apyMappings['Moonriver'][item.name]],
        network: 'apysMoonriver',
        vault: item.name
      }
    })
  }, [account?.address])

  const [{ data: totalValueData, loading: loadingTotalValue }] =
    useContractRead(
      {
        addressOrName:
          contractMappings['Moonriver'][item.name]['contract']['Vault'],
        contractInterface: item.name !== 'MOVR' ? normalAbi : nativeAbi,
        signerOrProvider: provider
      },
      'balance'
    )

  return (
    <div
      className={clsx('py-3 px-2 rounded-lg bg-[#f7f7f7] hover:bg-[#f0f0f0]')}
    >
      <div
        onClick={toggleDisclosure}
        className="flex items-center w-full font-medium cursor-pointer"
      >
        <span className="flex items-center w-3/4 space-x-2">
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
                  className="ml-2 hover:opacity-60 text-[15px] text-[#c0c0c0] underline"
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
                <span>TVL $</span>
                {item.tvl ? parseFloat(item.tvl).toFixed(2) : '0.00'}
              </span>
            </span>
          </div>
        </span>
        <span className="text-[17px] space-x-1 ml-6 w-1/3 font-normal">
          <span>
            {item.apy && aprToApy(parseFloat(item.apy)).toFixed(2)}%
            {/* {item.apy
              ? aprToApy(parseFloat(item.apy))
              : `${aprToApy(
                  parseFloat(resApyList[apyMappings['Moonriver'][item.name]])
                ).toFixed(2)}%`} */}
          </span>
          <span>{item.emoji}</span>
        </span>
        <span className="flex mr-1 font-normal items-end flex-col w-1/3 px-2 text-[17px] text-[#c0c0c0]">
          <span>
            {metaMaskBalance?.formatted
              ? formatMetaMaskBalance(metaMaskBalance)
              : null}
          </span>

          <span>
            {item.userDeposited
              ? parseFloat(item.userDeposited).toFixed(2)
              : '0.00'}
          </span>
        </span>
      </div>
    </div>
  )
}
