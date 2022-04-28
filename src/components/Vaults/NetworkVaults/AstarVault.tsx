import clsx from 'clsx'
import { ethers, providers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { APYType } from 'src/types'
import { contractMappings } from 'src/utils/constants'
import { apyMappings } from 'src/utils/constants'
import { useAccount, useContractRead } from 'wagmi'

import astarAbi from '../../../chain-info/abis/astarAbi.json'
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
  const [metaMaskBalance, setMetaMaskBalance] = useState('0')

  const [{ data: account }] = useAccount()

  console.log('METAMASK BALANCE ', metaMaskBalance)
  const provider = new providers.StaticJsonRpcProvider(
    'https://astar.blastapi.io/81297d7f-8827-4a29-86f1-a2dc3ffbf66b',
    {
      chainId: 592,
      name: 'Astar'
    }
  )

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        let providerEth: any = window.ethereum
        const provider = new ethers.providers.Web3Provider(providerEth, 'any')
        // Prompt user for account connections
        await provider.send('eth_requestAccounts', [])
        const contract = new ethers.Contract(
          accountMappings[item.name],
          astarAbi,
          provider
        )
        const signer = await provider.getSigner()

        const balance = (
          await contract.balanceOf(signer.getAddress())
        ).toString()

        setMetaMaskBalance((parseInt(balance) / 10 ** 18).toString())
      } catch (Error) {
        console.log('ERROR ', Error)
      }
    }
  }

  useEffect(() => {
    connectToMetamask()
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
        'py-3 px-2 rounded-lg bg-[#f7f7f7] transition duration-200 ease-in-out'
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
                  className="ml-2 text-[15px] transition duration-200 ease-in-out hover:opacity-60 text-[#c0c0c0] underline"
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
            <span>{parseFloat(metaMaskBalance).toFixed(2)}</span>
          </span>

          {balanceDataUnformatted &&
            (
              (balanceDataUnformatted as any) /
              10 ** contractMappings['Astar'][item.name]['decimals']
            ).toFixed(2)}
        </span>
      </div>
    </div>
  )
}
