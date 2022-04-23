import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { getNetworkLogo, getNetworkName } from 'src/utils/helpers'
import { useNetwork } from 'wagmi'

import ChevronDown from '../icons/ChevronDown'

export default function NetworkDropdown(props: {
  activeNetworkId: number | undefined
  otherOptions: number[]
}) {
  console.log(
    '🚀 ~ file: NetworkDropdown.tsx ~ line 10 ~ NetworkDropdown ~ props',
    props
  )
  const [{}, switchNetwork] = useNetwork()

  const switchToNetwork = async (networkId: number) => {
    if (switchNetwork) {
      let data = await switchNetwork(networkId)
      if (data.error) {
        toast.error(`${data.error.message}, please add network to your wallet.`)
      }
    }
  }
  console.log('Active network ', props.activeNetwork)

  console.log('Props other options ', props.otherOptions)
  return (
    <Menu
      as="div"
      className="bg-[#F2F2F2] rounded w-36 relative inline-block text-left"
    >
      {({ open }) => (
        <div>
          <Menu.Button className="flex w-full font-semibold items-center justify-between px-2 pr-2.5 py-1 bg-[#F2F2F2] rounded">
            <span className="inline-flex items-center">
              <img
                src={getNetworkLogo(props.activeNetworkId)}
                className="w-4 h-4 rounded-full ml-[1px] mr-[8px]"
                draggable={false}
                alt=""
              />
              <span>{getNetworkName(props.activeNetworkId)}</span>
            </span>
            <ChevronDown
              className={clsx(
                'w-5 transition ease-in-out duration-200 h-5 ml-1 -mr-1',
                {
                  'rotate-180': open
                }
              )}
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-1 w-36 origin-top-right bg-white border-[1.75px] border-[#E7E8E7] rounded-md focus:outline-none">
              {props.otherOptions &&
                props.otherOptions?.map(
                  (otherOption: number, index: number) => (
                    <Menu.Item key={index}>
                      <button
                        onClick={() => switchToNetwork(otherOption)}
                        className={clsx(
                          'py-1 outline-none rounded-md font-semibold hover:bg-[#F2F2F2] w-full flex items-center px-2'
                        )}
                      >
                        <span className="inline-flex items-center space-x-2">
                          <img
                            src={getNetworkLogo(otherOption)}
                            className="w-4 h-4 rounded-full"
                            draggable={false}
                            alt=""
                          />
                          <span>{getNetworkName(otherOption)}</span>
                        </span>
                      </button>
                    </Menu.Item>
                  )
                )}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}
