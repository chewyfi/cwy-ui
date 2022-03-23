import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import { APYType } from 'src/types'

import { PoolInfo } from './Pool-Info'
interface Props {
  item: APYType
  toggleDisclosure: () => void
}
export const Vault: React.FC<Props> = ({ item, toggleDisclosure }) => {
  return (
    <Disclosure>
      <Disclosure.Button
        as="div"
        className={clsx('py-3 px-2 rounded-lg hover:bg-gray-100', {
          'bg-gray-100 rounded-b-none': false
        })}
      >
        <div
          onClick={() => toggleDisclosure()}
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
          <PoolInfo name={item.name} />
        </Disclosure.Panel>
      )}
    </Disclosure>
  )
}
