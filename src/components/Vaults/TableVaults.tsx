import React, { useContext, useEffect, useState } from 'react'
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
  const [apyList, setApyList] = useState(context.apysAstar)
  console.log('current apy list ', apyList)
  console.log('current network ', network?.chain?.name)

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

  useEffect(() => {
    const currentNetwork = network?.chain?.name
    const moonriverApyList = context.apysMoonriver
    const astarApyList = context.apysAstar
    currentNetwork === 'Moonriver'
      ? setApyList(moonriverApyList)
      : setApyList(astarApyList)
  }, [network?.chain?.name])

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
            <MoonriverVault
              resPriceFeed={props.resPriceFeed}
              resApyList={props.resApyList}
              key={index}
              item={item}
              toggleDisclosure={() => toggleDisclosure(index)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {apyList.map((item, index) => (
            <AstarVault
              resPriceFeed={props.resPriceFeed}
              resApyList={props.resApyList}
              key={index}
              item={item}
              toggleDisclosure={() => toggleDisclosure(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Table
