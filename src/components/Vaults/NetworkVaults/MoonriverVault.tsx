import clsx from 'clsx'
import { providers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import {
  SET_USER_METAMASK_BALANCE,
  UPDATE_APY,
  UPDATE_DEPOSITED,
  UPDATE_TVL
} from 'src/context/actions'
import { APYType } from 'src/types'
import {
  apyMappings,
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
import { aprToApy } from 'src/utils/helpers'
import { useAccount, useBalance, useContractRead } from 'wagmi'

import normalAbi from '../../../chain-info/abis/normalMoonriverAbi.json'
import { AppContext } from '../../../context/index'
import { formatMetaMaskBalance } from '../../../utils/helpers'
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
  const [{ data: account }] = useAccount()

  const { dispatch } = useContext(AppContext)
  const router = useRouter()
  const [deposited, setDeposited] = useState(0)
  const [tvl, setTVL] = useState(0)
  const provider = new providers.StaticJsonRpcProvider(
    'https://moonriver-api.us-east-1.bwarelabs.com/202ce99d-c545-475a-a918-8b8effff9915',
    {
      chainId: 1285,
      name: 'moonriver'
    }
  )

  const [{ data: metaMaskBalance }] = useBalance({
    token: accountMappings[item.name],
    addressOrName: account?.address
  })

  item.userMetamaskBalance === null &&
    metaMaskBalance &&
    dispatch({
      type: SET_USER_METAMASK_BALANCE,
      payload: {
        network: 'apysMoonriver',
        vault: item.name,
        userMetamaskBalance: formatMetaMaskBalance(metaMaskBalance)
      }
    })

  const [
    {
      data: balanceDataUnformatted,
      loading: balanceDataLoading,
      error: balanceError
    },
    getData
  ] = useContractRead(
    {
      addressOrName:
        contractMappings['Moonriver'][item.name]['contract']['Vault'],
      contractInterface: normalAbi,
      signerOrProvider: provider
    },
    'balanceOf',
    {
      args: [account?.address]
    }
  )

  item.userDeposited === null &&
    balanceDataUnformatted !== undefined &&
    dispatch({
      type: UPDATE_DEPOSITED,
      payload: {
        deposited: balanceDataUnformatted
          ? parseFloat(balanceDataUnformatted?.toString()) /
            10 ** contractMappings['Moonriver'][item.name]['decimals']
          : 0,
        network: 'apysMoonriver',
        vault: item.name
      }
    })
  item.apy === null &&
    dispatch({
      type: UPDATE_APY,
      payload: {
        apy: resApyList[apyMappings['Moonriver'][item.name]],
        network: 'apysMoonriver',
        vault: item.name
      }
    })

  useEffect(() => {
    getData()
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
  }, [account?.address])

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
          <span>{item.apy && aprToApy(parseFloat(item.apy)).toFixed(2)}%</span>
          <span>{item.emoji}</span>
        </span>
        <span className="flex mr-1 font-normal items-end flex-col w-1/3 px-2 text-[17px] text-[#c0c0c0]">
          <span>
            {item?.userMetamaskBalance ? item?.userMetamaskBalance : '0.00'}
          </span>

          {item?.userDeposited
            ? parseFloat(item?.userDeposited).toFixed(2)
            : '0.00'}
        </span>
      </div>
    </div>
  )
}
