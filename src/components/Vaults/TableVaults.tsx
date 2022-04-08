import React, { useState } from 'react'
import { APYType } from 'src/types'

import { poolAddresses } from '../../chain-info/pool-addresses'
import BalanceModal from './BalanceModal/BalanceModal'
import { TableHeader } from './TableHeader'
import { Vault } from './Vault'

const vaultData: Array<APYType> = [
  {
    icon: '/static/tokens/movr.svg',
    name: 'MOVR',
    suffix: 'MOVR',
    apy: '75.81%',
    holdings: '--',
    isOpen: false,
    strategy: 'Lending',
    contracts: poolAddresses['MoonbeamMOVR']
  },
  {
    icon: '/static/tokens/weth.svg',
    name: 'WETH',
    apy: '68.54%',
    suffix: 'WETH',
    holdings: '--',
    strategy: 'Lending',
    isOpen: false,
    contracts: poolAddresses['MoonbeamETH']
  },
  {
    icon: '/static/tokens/wbtc.svg',
    name: 'WBTC',
    apy: '48.823%',
    suffix: 'WBTC',
    holdings: '--',
    strategy: 'Lending',
    isOpen: false,
    contracts: poolAddresses['MoonbeamBTCSupplyOnly']
  },
  {
    icon: '/static/tokens/usdc.svg',
    name: 'USDC',
    apy: '18.52%',
    holdings: '--',
    suffix: 'USDC',
    strategy: 'Lending',
    isOpen: false,
    contracts: poolAddresses['MoonbeamUSDC']
  },
  {
    icon: '/static/tokens/frax.svg',
    name: 'FRAX',
    apy: '14.33%',
    strategy: 'Lending',
    suffix: 'FRAX',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamFRAX']
  },
  {
    icon: '/static/tokens/usdt.svg',
    name: 'USDT',
    apy: '3.823%',
    strategy: 'Lending',
    suffix: 'USDT',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamUSDT']
  },
  {
    icon: '/static/tokens/3pool.svg',
    name: 'solar3POOL',
    apy: '3.823%',
    tvl: 'available soon',
    holdings: '--',
    isOpen: false,
    strategy: 'Solarbeam',
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/3pool',
    contracts: poolAddresses['Solarbeam3pool']
  },
  {
    icon: '/static/tokens/frax3pool.svg',
    name: 'solar3FRAX',
    apy: '48.823%',
    tvl: 'available soon',
    holdings: '--',
    isOpen: false,
    strategy: 'Solarbeam',
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/frax-3pool',
    contracts: poolAddresses['SolarbeamFrax3pool']
  },
  {
    icon: '/static/tokens/2ksm.svg',
    name: 'solarstKSM',
    apy: '8.823%',
    tvl: 'available soon',
    holdings: '--',
    isOpen: false,
    strategy: 'Solarbeam',
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
    contracts: poolAddresses['SolarbeamstKSMpool']
  }
]

const Table = (props: any) => {
  const [apyList, setApyList] = useState(vaultData)
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
    </div>
  )
}

export default Table
