export const TableHeader = () => {
  return (
    <div className="w-full">
      <div className="text-[15px] flex py-3 px-2 items-center w-full font-medium">
        <span className="w-16"></span>
        <span className="flex items-center w-2/5">
          Name
          <img className="h-3 ml-3" src="/static/down-arrow.svg" alt="" />
        </span>
        <span className="flex items-center w-1/5">
          APY
          <img className="h-3 ml-3" src="/static/down-arrow.svg" alt="" />
        </span>
        <span className="flex items-center w-1/5">
          TVL
          <img className="h-3 ml-3" src="/static/down-arrow.svg" alt="" />
        </span>
        <span className="w-1/5">Holdings</span>
        {/* <span className="w-1/5"></span> */}
      </div>
    </div>
  )
}
