import React, { useContext, useState } from 'react'
import { AppContext } from 'src/context'
import { APYType } from 'src/types'
import { useNetwork } from 'wagmi'

import { AstarVault } from './AstarVault'
import BalanceModal from './BalanceModal/BalanceModal'
import { MoonriverVault } from './MoonriverVault'
import { TableHeader } from './TableHeader'

const Table = (props: any) => {
  const context = useContext(AppContext)
  const [{ data: network }, switchNetwork] = useNetwork()
  const [moonriverApyList, setMoonriverApyList] = useState(
    context.apysMoonriver
  )
  const [astarApyList, setAstarApyList] = useState(context.apysAstar)

  console.log('current apy list ', moonriverApyList)
  console.log('current network ', network?.chain?.name)

  const [selectedAPY, setSelectedAPY] = useState<APYType | null>(null)
  const toggleDisclosureMoonriver = (index: number) => {
    let vaultData = moonriverApyList
    vaultData.map((item, idx) => {
      if (index === idx) {
        item.isOpen = !item.isOpen
        setSelectedAPY(item)
      } else {
        item.isOpen = false
      }
    })
    setMoonriverApyList(JSON.parse(JSON.stringify(vaultData)))
  }

  const toggleDisclosureAstar = (index: number) => {
    let vaultData = astarApyList
    vaultData.map((item, idx) => {
      if (index === idx) {
        item.isOpen = !item.isOpen
        setSelectedAPY(item)
      } else {
        item.isOpen = false
      }
    })
    setAstarApyList(JSON.parse(JSON.stringify(vaultData)))
  }

  return (
    <div className="w-full">
      <TableHeader />
      {selectedAPY && (
        <BalanceModal
          onClose={() => setSelectedAPY(null)}
          item={selectedAPY}
          show
        />
      )}

      {network?.chain?.name === 'Moonriver' && (
        <div className="space-y-2">
          {moonriverApyList.map((item, index) => (
            <MoonriverVault
              resPriceFeed={props.resPriceFeed}
              resApyList={props.resApyList}
              key={index}
              item={item}
              toggleDisclosure={() => toggleDisclosureMoonriver(index)}
            />
          ))}
        </div>
      )}

      {network?.chain?.name === 'Astar' && (
        <div className="space-y-2">
          {astarApyList.map((item, index) => (
            <AstarVault
              resPriceFeed={props.resPriceFeed}
              resApyList={props.resmoonriverApyList}
              key={index}
              item={item}
              toggleDisclosure={() => toggleDisclosureAstar(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Table
