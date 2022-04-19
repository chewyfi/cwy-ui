/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useNetwork } from 'wagmi'

import ChevronDown from '../icons/ChevronDown'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NetworkDropdown(props: any) {
  const [{ data: network }, switchNetwork] = useNetwork()
  const [{ data: accountData }] = useAccount()
  const switchToNetwork = async () => {
    if (switchNetwork) {
      let data
      network?.chain?.name === 'Astar'
        ? (data = await switchNetwork(1285))
        : (data = await switchNetwork(592))
      if (data.error) {
        toast.error(`${data.error.message}, please add network to your wallet.`)
      }
    }
  }
  return (
    <Menu
      as="div"
      className="bg-[#ededed] rounded relative inline-block text-left"
    >
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {/* <span className="inline-flex font-semibold items-center justify-between px-2 py-1 space-x-2 bg-[#ededed] rounded">
            <img
              src={
                props.activeNetwork === 'Moonriver'
                  ? '/static/moonriver.svg'
                  : '/static/astar.svg'
              }
              className="w-4 h-4 rounded-full"
              draggable={false}
              alt=""
            />
          </span> */}
          {props.activeNetwork}

          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={switchToNetwork}
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {props.otherOption}
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
