export const TableHeader = () => {
  return (
    <div className="w-full">
      <div className="text-[12px] flex py-3 font-bold items-center w-full">
        <span className="flex items-center w-2/4">
          <span className="flex flex-col items-start w-1/4 ml-3">
            <span>Token</span>
            <span>Strategy</span>
            <span className="flex items-center space-x-2">
              TVL
              <img className="h-2 ml-3" src="/static/down-arrow.svg" alt="" />
            </span>
          </span>
        </span>
        <span className="flex items-center w-1/4 ml-3">
          APY
          <img className="h-2 ml-3" src="/static/down-arrow.svg" alt="" />
        </span>
        <span className="flex flex-col items-end w-1/4 mr-6">
          <span>Balance</span>
          <span>Deposited</span>
        </span>
      </div>
    </div>
  )
}
