import clsx from 'clsx'
import { providers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { APYType } from 'src/types'
import { contractMappings } from 'src/utils/constants'
import { formatMetaMaskBalance } from 'src/utils/helpers'
import { useAccount, useBalance, useContractRead } from 'wagmi'

import AuroraAbi from '../../chain-info/abis/AuroraAbi.json'
interface Props {
  item: APYType
  toggleDisclosure: () => void
  resPriceFeed: any
  resApyList: any
}

const accountMappings: any = {
  'ROSE-STABLES':
    contractMappings['Aurora']['ROSE-STABLES']['contract']['want'],
  'WETH-WAurora':
    contractMappings['Aurora']['WETH-WAurora']['contract']['want'],
  'WBTC-WAurora':
    contractMappings['Aurora']['WBTC-WAurora']['contract']['want'],
  'USDC-WAurora':
    contractMappings['Aurora']['USDC-WAurora']['contract']['want'],
  'BEAST-USDC': contractMappings['Aurora']['BEAST-USDC']['contract']['lp']
}

// TODO: REMOVE
const apyMappings: any = {
  'USDT-USDC': 'N/A',
  'WETH-WAurora': 'N/A',
  'WBTC-WAurora': 'N/A',
  'USDC-WAurora': 'N/A',
  'BEAST-USDC': 'N/A'
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
    'https://mainnet.aurora.dev',
    {
      chainId: 1313161554,
      name: 'Aurora'
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
          contractMappings['Aurora'][item.name]['contract']['Vault'],
        contractInterface: AuroraAbi,
        signerOrProvider: provider
      },
      'balance'
    )

  const [
    { data: balanceDataUnformatted, loading: balanceDataLoading },
    getBalanceUser
  ] = useContractRead(
    {
      addressOrName: contractMappings['Aurora'][item.name]['contract']['Vault'],
      contractInterface: AuroraAbi,
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
          <embed draggable={false} className="w-8 h-8 mx-3" src={item.icon} />
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
                  parseFloat(resApyList[apyMappings['Aurora'][item.name]]) * 100
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
            {metaMaskBalance?.formatted
              ? formatMetaMaskBalance(metaMaskBalance)
              : null}
          </span>
          {balanceDataUnformatted &&
            (
              (balanceDataUnformatted as any) /
              10 ** contractMappings['Aurora'][item.name]['decimals']
            ).toFixed(2)}

          <span>{deposited.toFixed(2)}</span>
        </span>
      </div>
    </div>
  )
}
