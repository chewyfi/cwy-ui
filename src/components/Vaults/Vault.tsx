import clsx from 'clsx'
import React, { useEffect } from 'react'
import { APYType } from 'src/types'
import { useAccount, useProvider } from 'wagmi'

import { Spinner } from '../ui/Spinner'

interface Props {
  item: APYType
  toggleDisclosure: () => void
  resPriceFeed: any
  resApyList: any
}

const apyMappings: any = {
  USDC: 'moonwell-usdc-leverage',
  MOVR: 'moonwell-movr-leverage',
  USDT: 'moonwell-usdt-leverage',
  WETH: 'moonwell-eth-leverage',
  FRAX: 'moonwell-frax-leverage',
  WBTC: 'moonwell-btc-supply'
}

export const Vault: React.FC<Props> = ({
  item,
  toggleDisclosure,
  resPriceFeed,
  resApyList
}) => {
  const provider = useProvider()

  const [{ data: account }] = useAccount()

  const twoDecimalPoints = (num: number) => {
    if (num && typeof num == 'number') return num.toFixed(2)
  }

  useEffect(() => {
    console.log('VAULT PROPS ITEM', item)
  }, [account?.address])

  return (
    <div
      className={clsx('py-3 px-2 rounded-lg bg-[#f7f7f7] hover:bg-[#f0f0f0]')}
    >
      <div
        onClick={() => toggleDisclosure()}
        className="flex items-center w-full font-medium cursor-pointer"
      >
        <span className="flex items-center w-2/4 space-x-2">
          <img
            alt=""
            draggable={false}
            className="w-8 h-8 mx-3"
            src={item.icon}
          />
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
                <span className="mr-1">
                  {!item.tvl ? (
                    <Spinner />
                  ) : (
                    `TVL ${twoDecimalPoints(item.tvl)}`
                  )}
                </span>
              </span>
            </span>
          </div>
        </span>
        <span className="text-[17px] ml-6 w-1/3 font-normal">
          {(parseFloat(resApyList[apyMappings[item.name]]) * 100).toFixed(2)}%
        </span>
        <span className="flex mr-1 font-normal items-end flex-col w-1/3 px-2 text-[17px] text-[#c0c0c0]">
          <span>{twoDecimalPoints(item.userBalance)}</span>
        </span>
      </div>
    </div>
  )
}
