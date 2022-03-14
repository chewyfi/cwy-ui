import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import React, { useState } from 'react'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from 'src/utils/constants'
import { useBalance } from 'wagmi'

const APYS = [
  {
    icon: '/static/tokens/movr.svg',
    name: 'MOVR',
    apy: '75.81%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/weth.svg',
    name: 'WETH',
    apy: '68.54%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/wbtc.svg',
    name: 'WBTC',
    apy: '48.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/usdc.svg',
    name: 'USDC',
    apy: '18.52%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/frax.svg',
    name: 'FRAX',
    apy: '14.33%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/usdt.svg',
    name: 'USDT',
    apy: '3.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/3pool.svg',
    name: 'solar3POOL',
    apy: '3.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/frax3pool.svg',
    name: 'solar3FRAX',
    apy: '48.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  },
  {
    icon: '/static/tokens/2ksm.svg',
    name: 'KSM',
    apy: '8.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false
  }
]

const Table = () => {
  const [apyList, setApyList] = useState(APYS)
  const [{ data: movr }] = useBalance()
  const [{ data: weth }] = useBalance({
    addressOrName: WETH_TOKEN_CONTRACT
  })
  const [{ data: wbtc }] = useBalance({
    addressOrName: WBTC_TOKEN_CONTRACT
  })
  const [{ data: usdc }] = useBalance({
    addressOrName: WBTC_TOKEN_CONTRACT
  })
  const [{ data: usdt }] = useBalance({
    addressOrName: USDT_TOKEN_CONTRACT
  })
  const [{ data: frax }] = useBalance({
    addressOrName: FRAX_TOKEN_CONTRACT
  })
  const [{ data: threePool }] = useBalance({
    addressOrName: THREE_POOL_TOKEN_CONTRACT
  })
  const [{ data: frax3Pool }] = useBalance({
    addressOrName: FRAX_3POOL_TOKEN_CONTRACT
  })
  const [{ data: ksm }] = useBalance({
    addressOrName: TWO_KSM_TOKEN_CONTRACT
  })

  const getBalance = (token: string) => {
    switch (token) {
      case 'MOVR':
        return movr?.formatted
      case 'WETH':
        return weth?.formatted
      case 'WBTC':
        return wbtc?.formatted
      case 'USDC':
        return usdc?.formatted
      case 'FRAX':
        return frax?.formatted
      case 'USDT':
        return usdt?.formatted
      case 'solar3POOL':
        return threePool?.formatted
      case 'solar3FRAX':
        return frax3Pool?.formatted
      case 'KSM':
        return ksm?.formatted
    }
  }
  const toggleDisclosure = (index: number) => {
    let apys = apyList
    apys.map((item, idx) => {
      if (idx === index) {
        item.isOpen = !item.isOpen
      } else {
        item.isOpen = false
      }
    })
    setApyList(JSON.parse(JSON.stringify(apys)))
  }

  return (
    <div className="w-full my-4">
      <div className="w-full">
        <div className="text-[15px] flex py-3 px-2 items-center w-full font-medium">
          <span className="w-16"></span>
          <span className="flex items-center w-1/5">
            Name
            <img className="h-3 ml-3" src="/static/down-arrow.svg" alt="" />
          </span>
          <span className="flex items-center w-1/5">
            APY
            <img className="h-3 ml-3" src="/static/down-arrow.svg" alt="" />
          </span>
          <span className="flex items-center w-1/5">
            TVL
            <img className="h-3 ml-3" src="/static/down-arrow.svg" alt="" />
          </span>
          <span className="w-1/5">Holdings</span>
          <span className="w-1/5"></span>
        </div>
      </div>
      <div>
        {apyList.map((item, idx) => (
          <Disclosure as="div" onClick={() => toggleDisclosure(idx)} key={idx}>
            <Disclosure.Button
              as="div"
              className={clsx(
                'flex items-center py-3 cursor-pointer px-2 rounded-lg hover:bg-gray-100',
                {
                  'bg-gray-100 rounded-b-none': item.isOpen
                }
              )}
            >
              <span className="w-16">
                <img
                  alt=""
                  draggable={false}
                  className="w-8 h-8"
                  src={item.icon}
                />
              </span>
              <span className="w-1/5">{item.name}</span>
              <span className="w-1/5">{item.apy}</span>
              <span className="w-1/5">{item.tvl}</span>
              <span className="w-1/5">{item.holdings}</span>
              <span className="w-1/5 text-[14px] text-right">
                <button className="inline-block p-0.5 px-6 font-semibold tracking-wider border border-black rounded-md">
                  Deposit
                </button>
              </span>
            </Disclosure.Button>
            {item.isOpen && (
              <Disclosure.Panel
                static
                className="px-2 text-sm bg-gray-100 rounded-b-lg"
              >
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: {getBalance(item.name)} {item.name} LP
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
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black border-2 border-black rounded-lg">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 MOVR LP
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
        ))}
      </div>
    </div>
  )
}

export default Table
