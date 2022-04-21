import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import { useNetwork } from 'wagmi'

import ChevronDown from '../icons/ChevronDown'

export default function NetworkDropdown(props: any) {
  console.log(
    '🚀 ~ file: NetworkDropdown.tsx ~ line 10 ~ NetworkDropdown ~ props',
    props
  )
  const [{ data: network }, switchNetwork] = useNetwork()
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
      className="bg-[#F2F2F2] w-36 rounded relative inline-block text-left"
    >
      {({ open }) => (
        <>
          <Menu.Button className="flex w-full font-semibold items-center justify-between px-2 py-1 bg-[#F2F2F2] rounded">
            <span className="inline-flex items-center space-x-2">
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
              <span>{props.activeNetwork}</span>
            </span>
            <ChevronDown
              className={clsx(
                'w-5 transition ease-in-out duration-200 h-5 ml-2 -mr-1',
                {
                  'rotate-180': open
                }
              )}
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-1 origin-top-right bg-white border-[1.75px] border-[#E7E8E7] rounded-md w-36 focus:outline-none">
              <Menu.Item>
                <button
                  onClick={switchToNetwork}
                  className={clsx(
                    'py-1 outline-none rounded-md font-semibold hover:bg-[#F2F2F2] w-full flex items-center px-2'
                  )}
                >
                  <span className="inline-flex items-center space-x-2">
                    <img
                      src={
                        props.otherOption === 'Moonriver'
                          ? '/static/moonriver.svg'
                          : '/static/astar.svg'
                      }
                      className="w-4 h-4 rounded-full"
                      draggable={false}
                      alt=""
                    />
                    <span>{props.otherOption}</span>
                  </span>
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
