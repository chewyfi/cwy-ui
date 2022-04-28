import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/context'
import { APYType } from 'src/types'
import { apyMappings } from 'src/utils/constants'
import { useNetwork } from 'wagmi'

import BalanceModalAstar from './BalanceModals/BalanceModalAstar'
import BalanceModalAurora from './BalanceModals/BalanceModalAurora'
import BalanceModal from './BalanceModals/BalanceModalMoonriver'
import { AstarVault } from './NetworkVaults/AstarVault'
import { AuroraVault } from './NetworkVaults/AuroraVault'
import { MoonriverVault } from './NetworkVaults/MoonriverVault'
import { TableHeader } from './TableHeader'

const Table = (props: any) => {
  const context = useContext(AppContext)
  const [{ data: network }] = useNetwork()
  const [moonriverApyList, setMoonriverApyList] = useState(
    context.apysMoonriver
  )

  const [astarApyList, setAstarApyList] = useState(context.apysAstar)
  const [auroraApyList, setAuroraApyList] = useState(context.apysAurora)
  const [auroraAprs, setAuroraAprs] = useState<any>([])
  // console.log('current apy list ', moonriverApyList)
  console.log('current network ', network?.chain?.name)

  useEffect(() => {
    async function getData() {
      const arrayAurora = await await (
        await fetch(
          'https://raw.githubusercontent.com/RoseOnAurora/apr/master/data.json'
        )
      ).json()

      const arr = arrayAurora.map((apr: any, index: number) => {
        return {
          apr: apr.apr,
          name: apyMappings['Aurora'][apr.name],
          key: index
        }
      })
      console.log('aurora arr', arr)
      setAuroraAprs(arr)
    }
    getData()
  }, [])

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

  const toggleDisclosureAurora = (index: number) => {
    let vaultData = auroraApyList
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
      {selectedAPY && network?.chain?.name === 'Moonriver' && (
        <BalanceModal
          onClose={() => setSelectedAPY(null)}
          item={selectedAPY}
          show
        />
      )}
      {selectedAPY && network?.chain?.name === 'Astar' && (
        <BalanceModalAstar
          onClose={() => setSelectedAPY(null)}
          item={selectedAPY}
          show
        />
      )}

      {selectedAPY && network?.chain?.name === 'Aurora' && (
        <BalanceModalAurora
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

      {network?.chain?.name === 'Aurora' && (
        <div className="space-y-2">
          {auroraApyList.map((item, index) => (
            <AuroraVault
              aprList={Array(auroraAprs)}
              resPriceFeed={props.resPriceFeed}
              resApyList={props.resApyList}
              key={index}
              item={item}
              toggleDisclosure={() => toggleDisclosureAurora(index)}
            />
          ))}
        </div>
      )}

      {!network?.chain?.name && (
        <div className="space-y-2">
          {moonriverApyList.map((item, index) => (
            <MoonriverVault
              resPriceFeed={props.resPriceFeed}
              resApyList={props.resApyList}
              key={index}
              item={item}
              toggleDisclosure={() => toggleDisclosureAurora(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Table
