import clsx from 'clsx'
import { providers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { APYType } from 'src/types'
import { contractMappings } from 'src/utils/constants'
import { formatMetaMaskBalance } from 'src/utils/helpers'
import { useAccount, useBalance, useContractRead } from 'wagmi'

import astarAbi from '../../chain-info/abis/astarAbi.json'
interface Props {
  item: APYType
  toggleDisclosure: () => void
  resPriceFeed: any
  resApyList: any
}

const accountMappings: any = {
  'USDT-USDC': contractMappings['Astar']['USDT-USDC']['contract']['lp'],
  'WETH-WASTR': contractMappings['Astar']['WETH-WASTR']['contract']['lp'],
  'WBTC-WASTR': contractMappings['Astar']['WBTC-WASTR']['contract']['lp'],
  'USDC-WASTR': contractMappings['Astar']['USDC-WASTR']['contract']['lp'],
  'BEAST-USDC': contractMappings['Astar']['BEAST-USDC']['contract']['lp']
}

// TODO: REMOVE
const apyMappings: any = {
  'USDT-USDC': 'N/A',
  'WETH-WASTR': 'N/A',
  'WBTC-WASTR': 'N/A',
  'USDC-WASTR': 'N/A',
  'BEAST-USDC': 'N/A',
  'BEAST-WASTR': 'N/A'
}

const tvlMappings: any = {
  'USDT-USDC': 340.12,
  'WETH-WASTR': 1134.34,
  'WBTC-WASTR': 3314.72,
  'USDC-WASTR': 20.02,
  'BEAST-USDC': 5550.57
}

export const AstarVault: React.FC<Props> = ({
  item,
  toggleDisclosure,
  resPriceFeed,
  resApyList
}) => {
  console.log('ITEM NAME ', item.name)

  const router = useRouter()
  const [deposited, setDeposited] = useState(0)
  const [tvl, setTVL] = useState(0)

  const [{ data: account }] = useAccount()

  const [{ data: metaMaskBalance }] = useBalance({
    token: accountMappings[item.name],
    addressOrName: account?.address
  })
  const provider = new providers.StaticJsonRpcProvider(
    'https://astar.blastapi.io/81297d7f-8827-4a29-86f1-a2dc3ffbf66b',
    {
      chainId: 592,
      name: 'Astar'
    }
  )

  useEffect(() => {
    // const TVLFetch = async () => {
    //   const { basePath: baseURL } = router
    //   const { info } = await (
    //     await fetch(
    //       `${baseURL}/api/total-value-locked-usd-vault?vault=${item.name}`
    //     )
    //   ).json()
    //   setTVL(info.balance)
    // }
    // TVLFetch()
    // if (account?.address) {
    //   const getDeposited = async () => {
    //     const { basePath: baseURL } = router
    //     const { deposited } = await (
    //       await fetch(
    //         `${baseURL}/api/user-deposited?vault=${item.name}&useraddress=${account.address}`
    //       )
    //     ).json()
    //     setDeposited(deposited)
    //   }
    //   getDeposited()
    // }
  }, [account?.address])

  const [{ data: totalValueData, loading: loadingTotalValue }] =
    useContractRead(
      {
        addressOrName:
          contractMappings['Astar'][item.name]['contract']['Vault'],
        contractInterface: astarAbi,
        signerOrProvider: provider
      },
      'balance'
    )

  const [
    { data: balanceDataUnformatted, loading: balanceDataLoading },
    getBalanceUser
  ] = useContractRead(
    {
      addressOrName: contractMappings['Astar'][item.name]['contract']['Vault'],
      contractInterface: astarAbi,
      signerOrProvider: provider
    },
    'balanceOf',
    {
      args: [account?.address]
    }
  )

  console.log(`Balance data unformatted ${balanceDataUnformatted}`)
  return (
    <div
      className={clsx(
        'py-3 px-2 rounded-lg bg-[#f7f7f7] transition duration-200 ease-in-out hover:bg-[#f0f0f0]'
      )}
    >
      <div
        onClick={() => toggleDisclosure()}
        className="flex items-center w-full font-medium cursor-pointer"
      >
        <span className="flex items-center w-2/4 space-x-2">
          {item.icon && (
            <embed draggable={false} className="w-8 h-8 mx-3" src={item.icon} />
          )}
          {item.icons && (
            <span className="flex items-center mx-3">
              <embed
                draggable={false}
                className="z-10 w-5 h-5"
                src={item.icons[0]}
              />
              <embed
                draggable={false}
                className="w-5 h-5 -ml-2"
                src={item.icons[1]}
              />
            </span>
          )}
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
                0$
              </span>
            </span>
          </div>
        </span>
        <span className="text-[17px] space-x-1 ml-6 w-1/3 font-normal">
          <span>
            {apyMappings[item.name]}%
            {/* {item.apy
              ? item.apy
              : `${(
                  parseFloat(resApyList[apyMappings['Astar'][item.name]]) * 100
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
          {/* <span>
            {metaMaskBalance?.formatted
              ? formatMetaMaskBalance(metaMaskBalance)
              : null}
          </span> */}
          {balanceDataUnformatted &&
            (
              (balanceDataUnformatted as any) /
              10 ** contractMappings['Astar'][item.name]['decimals']
            ).toFixed(2)}

          <span>{deposited.toFixed(2)}</span>
        </span>
      </div>
    </div>
  )
}
