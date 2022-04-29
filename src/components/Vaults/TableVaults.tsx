import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/context'
import { APYType } from 'src/types'
import { apyMappings } from 'src/utils/constants'
import { useNetwork } from 'wagmi'

import BalanceModalAurora from './BalanceModals/BalanceModalAurora'
import BalanceModal from './BalanceModals/BalanceModalMoonriver'
import { AuroraVault } from './NetworkVaults/AuroraVault'
import { MoonriverVault } from './NetworkVaults/MoonriverVault'
import { TableHeader } from './TableHeader'

const Table = (props: any) => {
  const context = useContext(AppContext)
  const [{ data: network }] = useNetwork()
  const [moonriverApyList, setMoonriverApyList] = useState(
    context.globalState.apysMoonriver
  )
  const [auroraApyList, setAuroraApyList] = useState(context.apysAurora)
  const [auroraAprs, setAuroraAprs] = useState<any>([])

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
    vaultData.map((item: React.SetStateAction<APYType | null>, idx: number) => {
      if (index === idx) {
        setSelectedAPY(item)
      }
    })
    setMoonriverApyList(JSON.parse(JSON.stringify(vaultData)))
  }

  const toggleDisclosureAurora = (index: number) => {
    let vaultData = auroraApyList
    vaultData.map((item: React.SetStateAction<APYType | null>, idx: number) => {
      if (index === idx) {
        setSelectedAPY(item)
      }
    })
    setAuroraApyList(JSON.parse(JSON.stringify(vaultData)))
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

      {selectedAPY && network?.chain?.name === 'Aurora' && (
        <BalanceModalAurora
          onClose={() => setSelectedAPY(null)}
          item={selectedAPY}
          show
        />
      )}

      {network?.chain?.name === 'Moonriver' && (
        <div className="space-y-2">
          {context.globalState.apysMoonriver.map(
            (item: APYType, index: number) => (
              <MoonriverVault
                resPriceFeed={props.resPriceFeed}
                resApyList={props.resApyList}
                key={index}
                index={index}
                item={item}
                toggleDisclosure={() => toggleDisclosureMoonriver(index)}
              />
            )
          )}
        </div>
      )}

      {network?.chain?.name === 'Aurora' && (
        <div className="space-y-2">
          {auroraApyList.map((item: APYType, index: number) => (
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

      {/* {!network?.chain?.name && (
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
      )} */}
    </div>
  )
}

export default Table
