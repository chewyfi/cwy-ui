import React, { useState } from 'react'
import { APYType } from 'src/types'

import { poolAddresses } from '../../chain-info/pool-addresses'
import BalanceModal from './BalanceModal'
import { TableHeader } from './TableHeader'
import { Vault } from './Vault'

const APYS: Array<APYType> = [
  {
    icon: '/static/tokens/movr.svg',
    name: 'MOVR',
    apy: '75.81%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamMOVR']
  },
  {
    icon: '/static/tokens/weth.svg',
    name: 'WETH',
    apy: '68.54%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamETH']
  },
  {
    icon: '/static/tokens/wbtc.svg',
    name: 'WBTC',
    apy: '48.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamBTCSupplyOnly']
  },
  {
    icon: '/static/tokens/usdc.svg',
    name: 'USDC',
    apy: '18.52%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamUSDC']
  },
  {
    icon: '/static/tokens/frax.svg',
    name: 'FRAX',
    apy: '14.33%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamFRAX']
  },
  {
    icon: '/static/tokens/usdt.svg',
    name: 'USDT',
    apy: '3.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    contracts: poolAddresses['MoonbeamUSDT']
  },
  {
    icon: '/static/tokens/3pool.svg',
    name: 'solar3POOL',
    apy: '3.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/3pool',
    contracts: poolAddresses['Solarbeam3pool']
  },
  {
    icon: '/static/tokens/frax3pool.svg',
    name: 'solar3FRAX',
    apy: '48.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/frax-3pool',
    contracts: poolAddresses['SolarbeamFrax3pool']
  },
  {
    icon: '/static/tokens/2ksm.svg',
    name: 'solarstKSM',
    apy: '8.823%',
    tvl: '$0',
    holdings: '--',
    isOpen: false,
    suffix: 'LP',
    getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
    contracts: poolAddresses['SolarbeamstKSMpool']
  }
]

const Table = () => {
  const [apyList, setApyList] = useState(APYS)
  const [selectedAPY, setSelectedAPY] = useState('')
  const toggleDisclosure = (index: number) => {
    let apys = apyList
    apys.map((item, idx) => {
      if (index === idx) {
        item.isOpen = !item.isOpen
        setSelectedAPY(item.name)
      } else {
        item.isOpen = false
      }
    })
    setApyList(JSON.parse(JSON.stringify(apys)))
  }
  return (
    <div className="w-full">
      <TableHeader />
      {selectedAPY !== '' && (
        <BalanceModal
          onClose={() => setSelectedAPY('')}
          name={selectedAPY}
          show
        />
      )}
      <div className="space-y-2">
        {apyList.map((item, index) => (
          <Vault
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
