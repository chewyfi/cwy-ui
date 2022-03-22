import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import { useState } from 'react'

import { poolAddresses } from '../../chain-info/pool-addresses'

const APYS = [
  {
    icon: '/static/tokens/movr.svg',
    name: 'MOVR',
    apy: '75.81%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamMOVR']
  },
  {
    icon: '/static/tokens/weth.svg',
    name: 'WETH',
    apy: '68.54%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamETH']
  },
  {
    icon: '/static/tokens/wbtc.svg',
    name: 'WBTC',
    apy: '48.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamBTCSupplyOnly']
  },
  {
    icon: '/static/tokens/usdc.svg',
    name: 'USDC',
    apy: '18.52%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamUSDC']
  },
  {
    icon: '/static/tokens/frax.svg',
    name: 'FRAX',
    apy: '14.33%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamFRAX']
  },
  {
    icon: '/static/tokens/usdt.svg',
    name: 'USDT',
    apy: '3.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamUSDT']
  },
  {
    icon: '/static/tokens/3pool.svg',
    name: 'solar3POOL',
    apy: '3.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/3pool',
    contracts: poolAddresses['Solarbeam3pool']
  },
  {
    icon: '/static/tokens/frax3pool.svg',
    name: 'solar3FRAX',
    apy: '48.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/frax-3pool',
    contracts: poolAddresses['SolarbeamFrax3pool']
  },
  {
    icon: '/static/tokens/2ksm.svg',
    name: 'solarstKSM',
    apy: '8.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
    contracts: poolAddresses['SolarbeamstKSMpool']
  }
]

interface Props {
  item: any
  index: number
  balance: string | number
}
export const Vault: React.FC<Props> = ({ item, index, balance }) => {
  const [apyList, setApyList] = useState(APYS)
  const toggleDisclosure = (index: number) => {
    let apys = apyList
    apys.map((item, index) => {
      if (index === index) {
        item.isOpen = !item.isOpen
      } else {
        item.isOpen = false
      }
    })
    setApyList(JSON.parse(JSON.stringify(apys)))
  }

  return (
    <Disclosure key={index}>
      <Disclosure.Button
        as="div"
        className={clsx('py-3 px-2 rounded-lg hover:bg-gray-100', {
          'bg-gray-100 rounded-b-none': false
        })}
      >
        <div
          onClick={() => toggleDisclosure(index)}
          className="flex items-center w-full cursor-pointer"
        >
          <span className="w-16">
            <img alt="" draggable={false} className="w-8 h-8" src={item.icon} />
          </span>
          <span className="flex items-center w-2/5">
            {item.name}
            {item.getSomeUrl && (
              <a
                className="ml-2 text-xs text-gray-500 underline"
                href={item.getSomeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get some
              </a>
            )}
          </span>
          <span className="w-1/5">{item.apy}</span>
          <span className="w-1/5">{item.tvl}</span>
          <span className="w-1/5">{item.holdings}</span>
          {/* <span className="w-1/5 text-[14px] text-right">
          <button
            onClick={(e) => e.stopPropagation()}
            className="inline-block p-0.5 px-6 font-semibold tracking-wider border border-black rounded-md"
          >
            Deposit
          </button>
        </span> */}
        </div>
      </Disclosure.Button>
      {item.isOpen && (
        <Disclosure.Panel
          static
          className="px-2 text-sm bg-gray-100 rounded-b-lg"
        >
          <div className="flex space-x-2">
            <div className="mt-1 mb-3 text-gray-500">
              <label className="mb-1 text-[11px]">
                Balance: {balance} {item.suffix}
              </label>
              <div className="flex items-center text-[12px]">
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                />
                <button className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                  max
                </button>
              </div>
              <button
                // onClick={() => approve(item.contracts, provider)}
                className="inline-block w-full p-1 mt-1 text-white bg-black border-2 border-black rounded-lg"
              >
                Approve
              </button>
            </div>
            <div className="mt-1 mb-3 text-gray-500">
              <label className="mb-1 text-[11px]">
                Deposited: 0 {item.name} {item.suffix}
              </label>
              <div className="flex items-center text-[12px]">
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                />
                <button className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                  max
                </button>
              </div>
              <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded-lg">
                Withdraw
              </button>
            </div>
          </div>
        </Disclosure.Panel>
      )}
    </Disclosure>
  )
}
