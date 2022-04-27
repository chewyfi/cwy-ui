import clsx from 'clsx'
import { useNetwork } from 'wagmi'

export const TableHeader = () => {
  const [{ data: network }] = useNetwork()

  return (
    <div className="w-full">
      <div className="text-[15px] flex py-3 font-medium items-center w-full">
        <span
          className={clsx('flex items-center w-2/4', {
            '!w-3/4': network.chain?.id === 1313161554
          })}
        >
          <span className="flex flex-col items-start w-1/3 ml-3">
            <span className="-mb-1">Token</span>
            <span className="-mb-1">Strategy</span>
            <span className="flex items-center space-x-2">
              TVL
              <img className="h-2 ml-3" src="/static/down-arrow.svg" alt="" />
            </span>
          </span>
        </span>
        <span className="flex items-center w-1/3 ml-8">
          APY
          <img className="h-2 ml-3" src="/static/down-arrow.svg" alt="" />
        </span>
        <span className="flex justify-end w-1/3 mr-3">
          <div className="flex flex-col text-left">
            <span className="-mb-1">Balance</span>
            <span>Deposited</span>
          </div>
        </span>
      </div>
    </div>
  )
}
