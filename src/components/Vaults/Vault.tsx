import clsx from 'clsx'
import React from 'react'
import { APYType } from 'src/types'

interface Props {
  item: APYType
  toggleDisclosure: () => void
}

export const Vault: React.FC<Props> = ({ item, toggleDisclosure }) => {
  return (
    <div className={clsx('py-3 px-2 rounded-lg bg-[#f7f7f7]')}>
      <div
        onClick={() => toggleDisclosure()}
        className="flex items-center w-full cursor-pointer"
      >
        <span className="flex items-center w-2/4 space-x-2">
          <img
            alt=""
            draggable={false}
            className="w-8 h-8 mx-2"
            src={item.icon}
          />
          <div className="flex flex-col font-normal">
            <span className="text-[12px] -mb-0.5 flex space-x-2">
              {item.name}
              {item.getSomeUrl && (
                <a
                  className="ml-2 text-xs text-[#c0c0c0] underline"
                  href={item.getSomeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get some
                </a>
              )}
            </span>
            <span className="text-[11px] text-[#c0c0c0]">Solarbeam</span>
            <span className="text-[11px] text-[#c0c0c0]">TVL $125k</span>
          </div>
        </span>
        <span className="text-[14px] w-1/4">{item.apy}</span>
        <span className="flex mr-2 items-end flex-col w-1/4 px-2 text-[14px] text-[#c0c0c0]">
          <span>0.0</span>
          <span>0.0</span>
        </span>
        {/* <span className="w-1/5 text-[14px] text-right">
          <button
            onClick={(e) => e.stopPropagation()}
            className="inline-block p-0.5 px-6 font-semibold tracking-wider border border-black rounded-md"
          >
            Deposit
          </button>
        </span> */}
      </div>
    </div>
  )
}
