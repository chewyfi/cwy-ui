import clsx from 'clsx'
import { ethers, providers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { APYType } from 'src/types'
import { contractMappings } from 'src/utils/constants'
import { useAccount, useContractRead } from 'wagmi'

import auroraAbi from '../../chain-info/abis/auroraAbi.json'
interface Props {
  item: APYType
  toggleDisclosure: () => void
  resPriceFeed: any
  resApyList: any
}

const accountMappings: any = {
  'ROSE-STABLES':
    contractMappings['Aurora']['ROSE-STABLES']['contract']['Want'],
  'MAI-STABLES': contractMappings['Aurora']['MAI-STABLES']['contract']['Want'],
  'FRAX-STABLES':
    contractMappings['Aurora']['FRAX-STABLES']['contract']['Want'],
  'UST-STABLES': contractMappings['Aurora']['UST-STABLES']['contract']['Want'],
  'BUSD-STAPLES':
    contractMappings['Aurora']['BUSD-STAPLES']['contract']['Want'],
  'ROSE-RUSD': contractMappings['Aurora']['ROSE-RUSD']['contract']['Want']
}

// TODO: REMOVE
const apyMappings: any = {
  'ROSE-STABLES': '18',
  'UST-STABLES': '26',
  'FRAX-STABLES': '23',
  'MAI-STABLES': '21',
  'BUSD-STAPLES': '22',
  'ROSE-RUSD': '36'
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
  const [metaMaskBalance, setMetaMaskBalance] = useState('0')

  const [{ data: account }] = useAccount()

  const provider = new providers.StaticJsonRpcProvider(
    'https://mainnet.aurora.dev',
    {
      chainId: 1313161554,
      name: 'Aurora'
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
          auroraAbi,
          provider
        )
        const signer = await provider.getSigner()

        const balance = (
          await contract.balanceOf(signer.getAddress())
        ).toString()

        console.log(
          'Balance ',
          item.name,
          (parseInt(balance) / 10 ** 18).toString()
        )

        setMetaMaskBalance((parseInt(balance) / 10 ** 18).toString())

        console.log(`${item.name} balance ${balance}`)
      } catch (Error) {
        console.log('ERROR ', Error)
      }
    }
  }

  useEffect(() => {
    connectToMetamask()
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

  console.log('ITEM NAME ', item.name)

  item.strategy = 'Rose'

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
                {parseFloat(metaMaskBalance).toFixed(2)}
              </span>
            </span>
          </div>
        </span>
        <span className="text-[17px] space-x-1 ml-6 w-1/3 font-normal">
          <span>{apyMappings[item.name]}%</span>
        </span>
        <span className="flex mr-1 font-normal items-end flex-col w-1/3 px-2 text-[17px] text-[#c0c0c0]">
          <span>{parseFloat(metaMaskBalance).toFixed(2)}</span>

          {balanceDataUnformatted &&
            (
              (balanceDataUnformatted as any) /
              10 ** contractMappings['Aurora'][item.name]['decimals']
            ).toFixed(2)}
        </span>
      </div>
    </div>
  )
}
