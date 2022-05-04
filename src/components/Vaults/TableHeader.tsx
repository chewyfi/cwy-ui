import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useContext, useState } from 'react'
import { AppContext } from 'src/context'
import { useNetwork } from 'wagmi'

import {
  SORT_BY_APY,
  SORT_BY_DEPOSITED,
  SORT_BY_TVL
} from '../../context/actions'

export const TableHeader = () => {
  const [{ data: network }] = useNetwork()
  const { dispatch, globalState } = useContext(AppContext)
  const [up, setUp] = useState(false)

  function sortByTvl() {
    switch (globalState.selectedNetwork) {
      case 1285: {
        dispatch({
          type: SORT_BY_TVL,
          payload: {
            network: 'apysMoonriver'
          }
        })
        break
      }
      case 1313161554: {
        dispatch({
          type: SORT_BY_TVL,
          payload: {
            network: 'apysAurora'
          }
        })
        break
      }
      default:
        break
    }
  }

  function sortByApy() {
    switch (globalState.selectedNetwork) {
      case 1285: {
        dispatch({
          type: SORT_BY_APY,
          payload: {
            network: 'apysMoonriver'
          }
        })
        break
      }
      case 1313161554: {
        dispatch({
          type: SORT_BY_APY,
          payload: {
            network: 'apysAurora'
          }
        })
        break
      }
      default:
        break
    }
  }

  function sortByDeposited() {
    console.log('Sort by Deposited clicked')
    switch (globalState.selectedNetwork) {
      case 1285: {
        dispatch({
          type: SORT_BY_DEPOSITED,
          payload: {
            network: 'apysMoonriver'
          }
        })
        break
      }
      case 1313161554: {
        dispatch({
          type: SORT_BY_DEPOSITED,
          payload: {
            network: 'apysAurora'
          }
        })
        break
      }
      default:
        break
    }
  }

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
              <button>
                <ChevronDownIcon
                  onClick={() => sortByTvl()}
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </span>
          </span>
        </span>
        <span className="flex items-center w-1/3 ml-8">
          APY
          <button>
            <ChevronDownIcon
              onClick={() => sortByApy()}
              className="-mr-1 ml-1 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </span>
        <span className="flex justify-end w-1/3 mr-3">
          <div className="flex flex-col text-left">
            <span className="-mb-1">Balance</span>

            <span className="-mb-1">
              Deposited
              <button>
                <ChevronDownIcon
                  onClick={() => sortByDeposited()}
                  className="-mr-1 -mb-1 ml-1 h-5 w-5"
                />
              </button>
            </span>
          </div>
        </span>
      </div>
    </div>
  )
}
