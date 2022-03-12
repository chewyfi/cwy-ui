import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

const Table = () => {
  return (
    <div className="w-full my-4">
      <div className="w-full">
        <div className="text-[15px] flex py-3 px-2 items-center w-full font-medium">
          <span className="w-16"></span>
          <span className="w-1/5">Name</span>
          <span className="w-1/5">APY</span>
          <span className="w-1/5">TVL</span>
          <span className="w-1/5">Holdings</span>
          <span className="w-1/5"></span>
        </div>
      </div>
      <div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center py-3 cursor-pointer px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/movr.svg"
                  />
                </span>
                <span className="w-1/5">MOVR</span>
                <span className="w-1/5">75.81%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 MOVR LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
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
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/weth.svg"
                  />
                </span>
                <span className="w-1/5">WETH</span>
                <span className="w-1/5">68.54%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 WETH LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 WETH LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/wbtc.svg"
                  />
                </span>
                <span className="w-1/5">WBTC</span>
                <span className="w-1/5">42.823%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 WBTC LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 WBTC LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/usdc.svg"
                  />
                </span>
                <span className="w-1/5">USDC</span>
                <span className="w-1/5">18.52%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 USDC LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 USDC LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              {' '}
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/frax.svg"
                  />
                </span>
                <span className="w-1/5">FRAX</span>
                <span className="w-1/5">14.25%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 FRAX LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 FRAX LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/usdt.svg"
                  />
                </span>
                <span className="w-1/5">USDT</span>
                <span className="w-1/5">3.92%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 USDT LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 USDT LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/3pool.svg"
                  />
                </span>
                <span className="w-1/5">solar3POOL</span>
                <span className="w-1/5">3.92%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 solar3POOL LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 solar3POOL LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/frax3pool.svg"
                  />
                </span>
                <span className="w-1/5">solar3FRAX</span>
                <span className="w-1/5">3.92%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 solar3FRAX LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 solar3FRAX LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className={clsx(
                  'flex items-center cursor-pointer py-3 px-2 rounded-lg hover:bg-gray-100',
                  {
                    'bg-gray-100 rounded-b-none': open
                  }
                )}
              >
                <span className="w-16">
                  <img
                    alt=""
                    draggable={false}
                    className="h-6"
                    src="/static/tokens/2ksm.svg"
                  />
                </span>
                <span className="w-1/5">KSM</span>
                <span className="w-1/5">3.92%</span>
                <span className="w-1/5">$0</span>
                <span className="w-1/5">--</span>
                <span className="w-1/5 text-[12px] text-right">
                  <button className="inline-block p-1 px-6 border-2 border-gray-500 rounded">
                    Deposit
                  </button>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 text-sm bg-gray-100 rounded-b-lg">
                <div className="flex space-x-2">
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Balance: 0 KSM LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-white bg-black rounded">
                      Approve
                    </button>
                  </div>
                  <div className="mt-1 mb-3 text-gray-500">
                    <label className="mb-1 text-[11px]">
                      Deposited: 0 KSM LP
                    </label>
                    <div className="flex items-center text-[12px]">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full px-2 py-1 border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                      />
                      <button className="px-2 py-1 bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                        max
                      </button>
                    </div>
                    <button className="inline-block w-full p-1 mt-1 text-gray-500 border-2 border-gray-300 rounded">
                      Withdraw
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default Table
