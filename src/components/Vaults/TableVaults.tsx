import React, { useContext, useState } from 'react'
import { AppContext } from 'src/context'
import { APYType } from 'src/types'
import { useNetwork } from 'wagmi'

import BalanceModal from './BalanceModal/BalanceModal'
import { TableHeader } from './TableHeader'
import { Vault } from './Vault'

const Table = (props: any) => {
  const context = useContext(AppContext)
  const [{ data: network }, switchNetwork] = useNetwork()

  const [apyList, setApyList] = useState(context.apys)
  const [selectedAPY, setSelectedAPY] = useState<APYType | null>(null)
  const toggleDisclosure = (index: number) => {
    let vaultData = apyList
    vaultData.map((item, idx) => {
      if (index === idx) {
        item.isOpen = !item.isOpen
        setSelectedAPY(item)
      } else {
        item.isOpen = false
      }
    })
    setApyList(JSON.parse(JSON.stringify(vaultData)))
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
      {network?.chain?.name === 'Moonriver' ? (
        <div className="space-y-2">
          {apyList.map((item, index) => (
            <Vault
              resPriceFeed={props.resPriceFeed}
              resApyList={props.resApyList}
              key={index}
              item={item}
              toggleDisclosure={() => toggleDisclosure(index)}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Table
