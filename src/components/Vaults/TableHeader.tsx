import clsx from 'clsx'
import { useContext, useState } from 'react'
import { AppContext } from 'src/context'
import { SORT_BY_TVL } from 'src/context/actions'
import { useNetwork } from 'wagmi'

import { SORT_BY_APY, SORT_BY_DEPOSITED } from '../../context/actions'

export const TableHeader = () => {
  const [{ data: network }] = useNetwork()
  const { dispatch, globalState } = useContext(AppContext)
  const [up, setUp] = useState(false)

  return (
    <div className="w-full">
      <div className="text-[15px] flex py-3 font-medium items-center w-full">
        <span
          className={clsx('flex items-center w-2/4', {
            '!w-3/4':
              network.chain?.id === 1313161554 || network.chain?.id === 1285
          })}
        >
          <span className="flex flex-col items-start w-1/3 ml-3">
            <span className="-mb-1">Token</span>
            <span className="-mb-1">Strategy</span>
            <span className="flex items-center space-x-2">
              TVL
              <img
                onClick={() => {
                  console.log('DISPATCH FIRING')
                  console.log('i WAS CLICKED')
                  dispatch({
                    type: SORT_BY_TVL,
                    payload: {
                      up
                    }
                  })
                }}
                className="h-2 ml-3"
                src="/static/down-arrow.svg"
                alt=""
              />
            </span>
          </span>
        </span>
        <span className="flex items-center w-1/3 ml-8">
          APY
          <img
            className="h-2 ml-3"
            src="/static/down-arrow.svg"
            alt=""
            onClick={() => {
              console.log('SORT BY APY CALLED')
              dispatch({
                type: SORT_BY_APY
              })
            }}
          />
        </span>
        <span className="flex justify-end w-1/3 mr-3">
          <div className="flex flex-col text-left">
            <span className="-mb-1">Balance</span>

            <span>Deposited</span>
            <img
              className="h-2 ml-3"
              src="/static/down-arrow.svg"
              alt=""
              onClick={() => {
                dispatch({
                  type: SORT_BY_DEPOSITED
                })
              }}
            />
          </div>
        </span>
      </div>
    </div>
  )
}
