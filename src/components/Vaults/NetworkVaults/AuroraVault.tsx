import clsx from 'clsx'
import { ethers, providers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/context'
import {
  SET_USER_METAMASK_BALANCE,
  UPDATE_APY,
  UPDATE_DEPOSITED,
  UPDATE_TVL
} from 'src/context/actions'
import { APYType } from 'src/types'
import { contractMappings } from 'src/utils/constants'
import { aprToApy } from 'src/utils/helpers'
import { useAccount, useContractRead, useNetwork } from 'wagmi'

import auroraAbi from '../../../chain-info/abis/auroraAbi.json'
interface Props {
  item: APYType
  toggleDisclosure: () => void
  resPriceFeed: any
  resApyList: any
  aprList?: any
}

const accountMappings: any = {
  STABLES: contractMappings['Aurora']['STABLES']['contract']['Want'],
  'STABLES-MAI': contractMappings['Aurora']['STABLES-MAI']['contract']['Want'],
  'STABLES-FRAX':
    contractMappings['Aurora']['STABLES-FRAX']['contract']['Want'],
  'STABLES-UST': contractMappings['Aurora']['STABLES-UST']['contract']['Want'],
  'STABLES-BUSD':
    contractMappings['Aurora']['STABLES-BUSD']['contract']['Want'],
  'STABLES-RUSD': contractMappings['Aurora']['STABLES-RUSD']['contract']['Want']
}

const tvlMappings: any = {
  'USDT-USDC': 340.12,
  'WETH-WAurora': 1134.34,
  'WBTC-WAurora': 3314.72,
  'USDC-WAurora': 20.02,
  'BEAST-USDC': 5550.57
}

export const AuroraVault: React.FC<Props> = ({
  item,
  toggleDisclosure,
  resPriceFeed,
  resApyList,
  aprList
}) => {
  const { dispatch, globalState } = useContext(AppContext)
  const router = useRouter()
  const [deposited, setDeposited] = useState(0)
  const [tvl, setTVL] = useState(0)
  const [metaMaskBalance, setMetaMaskBalance] = useState('0')
  const [{ data: network }, switchNetwork] = useNetwork()

  const [{ data: account }] = useAccount()

  const provider = new providers.StaticJsonRpcProvider(
    'https://mainnet.aurora.dev',
    {
      chainId: 1313161554,
      name: 'Aurora'
    }
  )

  const getApr = (array: any) => {
    const filtered = array[0].filter((apr: any) => {
      if (apr.name === item.name) {
        console.log('MATCHED ', parseFloat(apr.apr).toFixed(2))
        return parseFloat(apr.apr).toFixed(2)
      }
    })[0]
    item.apy === null &&
      filtered.apr &&
      dispatch({
        type: UPDATE_APY,
        payload: {
          apy: parseFloat(filtered.apr) / 100,
          network: 'apysAurora',
          vault: item.name
        }
      })

    if (filtered) {
      return parseFloat(filtered.apr) / 100
    } else {
      console.log('NA case')
      return 0
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        let providerEth: any = window.ethereum
        const provider = new ethers.providers.Web3Provider(providerEth, 'any')
        // Prompt user for account connections
        await provider.send('eth_requestAccounts', [])
        const contract = new ethers.Contract(
          accountMappings[item.name],
          auroraAbi,
          provider
        )
        const signer = await provider.getSigner()

        const balance = (
          await contract.balanceOf(signer.getAddress())
        ).toString()

        const balanceFormatted = (parseInt(balance) / 10 ** 18).toString()
        item.userMetamaskBalance === null &&
          dispatch({
            type: SET_USER_METAMASK_BALANCE,
            payload: {
              network: 'apysAurora',
              vault: item.name,
              userMetamaskBalance: balanceFormatted
            }
          })

        setMetaMaskBalance(balanceFormatted)
      } catch (Error) {
        console.log('ERROR ', Error)
      }
    }
  }

  const [{ data: totalValueData, loading: loadingTotalValue }] =
    useContractRead(
      {
        addressOrName:
          contractMappings['Aurora'][item.name]['contract']['Vault'],
        contractInterface: auroraAbi,
        signerOrProvider: provider
      },
      'balance'
    )

  useEffect(() => {
    connectToMetamask()
    totalValueData &&
      item.tvl === null &&
      dispatch({
        type: UPDATE_TVL,
        payload: {
          network: 'apysAurora',
          vault: item.name,
          tvl: parseInt(totalValueData.toString()) / 10 ** 18
        }
      })
  }, [account?.address, totalValueData])

  const [
    { data: balanceDataUnformatted, loading: balanceDataLoading },
    getBalanceUser
  ] = useContractRead(
    {
      addressOrName: contractMappings['Aurora'][item.name]['contract']['Vault'],
      contractInterface: auroraAbi,
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
        deposited: parseFloat(balanceDataUnformatted?.toString()) / 10 ** 18,
        network: 'apysAurora',
        vault: item.name
      }
    })

  return (
    <div
      className={clsx('py-3 px-2 rounded-lg bg-[#f7f7f7] hover:bg-[#f0f0f0]')}
    >
      <div
        onClick={() => {
          if (network?.chain?.name !== globalState.selectedNetwork) {
          } else {
            toggleDisclosure()
          }
        }}
        className="flex items-center w-full font-medium cursor-pointer"
      >
        <span className="flex items-center w-3/4 space-x-2">
          <embed draggable={false} className="w-8 h-8 mx-3" src={item.icon} />
          <div className="flex flex-col">
            <span className="text-[15px] -mb-0.5 flex space-x-2">
              {item.name}
              {item.getSomeUrl && (
                <a
                  className="ml-2 text-[15px] hover:opacity-60 text-[#c0c0c0] underline"
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
                <span className="mr-1">TVL</span>$
                {item.tvl && Number(item.tvl).toFixed(2)}
              </span>
            </span>
          </div>
        </span>
        <span className="text-[17px] space-x-1 ml-6 w-1/3 font-normal">
          <span>{aprList && aprToApy(getApr(aprList)).toFixed(2)}%</span>
        </span>
        <span className="flex mr-1 font-normal items-end flex-col w-1/3 px-2 text-[17px] text-[#c0c0c0]">
          <span>
            {item?.userMetamaskBalance
              ? Number(item?.userMetamaskBalance).toFixed(2)
              : '0.00'}
          </span>

          {item?.userDeposited
            ? parseFloat(item?.userDeposited).toFixed(2)
            : '0.00'}
        </span>
      </div>
    </div>
  )
}
