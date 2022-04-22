import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useNetwork } from 'wagmi'

import ChevronDown from '../icons/ChevronDown'

const svgMappings: any = {
  Aurora: '/static/aurora.svg',
  Moonriver: '/static/moonriver.svg',
  Astar: '/static/astar.svg'
}

export default function NetworkDropdown(props: any) {
  console.log(
    '🚀 ~ file: NetworkDropdown.tsx ~ line 10 ~ NetworkDropdown ~ props',
    props
  )
  const [{ data: network }, switchNetwork] = useNetwork()
  const switchToNetwork = async (networkName: string) => {
    const mappings: any = {
      Aurora: 1313161554,
      Moonriver: 1285,
      Astar: 592
    }
    if (switchNetwork) {
      let data = await switchNetwork(mappings[networkName])
      if (data.error) {
        toast.error(`${data.error.message}, please add network to your wallet.`)
      }
    }
  }

  console.log('Props other options ', props.otherOption)
  return (
    <Menu
      as="div"
      className="bg-[#F2F2F2] rounded w-36 relative inline-block text-left"
    >
      {({ open }) => (
        <div>
          <Menu.Button className="flex w-full font-semibold items-center justify-between px-2 py-1 bg-[#F2F2F2] rounded">
            <span className="inline-flex items-center space-x-1">
              <embed
                src={svgMappings[props.activeNetwork]}
                className="w-4 h-4 rounded-full"
                draggable={false}
              />
              <span>{props.activeNetwork}</span>
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
              {props.otherOption &&
                props.otherOption?.map((otherOption: string, index: number) => (
                  <Menu.Item key={index}>
                    <button
                      onClick={() => switchToNetwork(otherOption)}
                      className={clsx(
                        'py-1 outline-none rounded-md font-semibold hover:bg-[#F2F2F2] w-full flex items-center px-2'
                      )}
                    >
                      <span className="inline-flex items-center space-x-2">
                        <img
                          src={svgMappings[otherOption]}
                          className="w-4 h-4 rounded-full"
                          draggable={false}
                          alt=""
                        />
                        <span>{otherOption}</span>
                      </span>
                    </button>
                  </Menu.Item>
                ))}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}
