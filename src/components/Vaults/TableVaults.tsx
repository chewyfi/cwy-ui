import React, { useEffect, useState } from 'react'
import { APYType } from 'src/types'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDC_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from 'src/utils/constants'
import { useAccount, useBalance } from 'wagmi'

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
  const [{ data: account }] = useAccount()
  const [apyList, setApyList] = useState(vaultData)
  const [selectedAPY, setSelectedAPY] = useState<APYType | null>(null)

  const [{ data: movr }] = useBalance({
    addressOrName: account?.address
  })
  const [{ data: weth }] = useBalance({
    token: WETH_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: wbtc }] = useBalance({
    token: WBTC_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: usdc }] = useBalance({
    token: USDC_TOKEN_CONTRACT,
    addressOrName: account?.address
  })

  const [{ data: usdt }] = useBalance({
    token: USDT_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: frax }] = useBalance({
    token: FRAX_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: threePool }] = useBalance({
    token: THREE_POOL_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: frax3Pool }] = useBalance({
    token: FRAX_3POOL_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: solarstKSM }] = useBalance({
    token: TWO_KSM_TOKEN_CONTRACT,
    addressOrName: account?.address
  })

  const getBalance = (token: string) => {
    switch (token) {
      case 'MOVR':
        return movr?.formatted ? movr?.formatted : '0'
      case 'WETH':
        return weth?.formatted ? weth?.formatted : '0'
      case 'WBTC':
        return wbtc?.formatted ? wbtc?.formatted : '0'
      case 'USDC':
        let numUSDC = parseFloat(usdc?.formatted || '0') * 10 ** 12
        return numUSDC ? numUSDC.toString() : '0'
      case 'FRAX':
        return frax?.formatted ? frax?.formatted : '0'
      case 'USDT':
        let numUSDT = parseFloat(usdt?.formatted || '0') * 10 ** 12
        return numUSDT ? numUSDT.toString() : '0'
      case 'solar3POOL':
        return threePool?.formatted ? threePool?.formatted : '0'
      case 'solar3FRAX':
        return frax3Pool?.formatted ? frax3Pool?.formatted : '0'
      case 'solarstKSM':
        return solarstKSM?.formatted ? solarstKSM?.formatted : '0'
    }
  }

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
    const getAllData = async () => {
      const { activeVaultsTotalValueLocked } = await (
        await fetch('http://localhost:3000/api/total-value-locked-usd')
      ).json()
      if (account?.address) {
        const vaultData2: Array<APYType> = [
          {
            icon: '/static/tokens/movr.svg',
            name: 'MOVR',
            suffix: 'MOVR',
            apy: '75.81%',
            tvl: activeVaultsTotalValueLocked['MOVR'],
            userBalance: getBalance('MOVR'),
            holdings: '--',
            isOpen: false,
            strategy: 'Lending',
            contracts: poolAddresses['MoonbeamMOVR']
          },
          {
            icon: '/static/tokens/weth.svg',
            name: 'WETH',
            apy: '68.54%',
            tvl: activeVaultsTotalValueLocked['WETH'],
            suffix: 'WETH',
            userBalance: getBalance('WETH'),
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
            tvl: activeVaultsTotalValueLocked['WBTC'],
            userBalance: getBalance('WBTC'),
            holdings: '--',
            strategy: 'Lending',
            isOpen: false,
            contracts: poolAddresses['MoonbeamBTCSupplyOnly']
          },
          {
            icon: '/static/tokens/usdc.svg',
            name: 'USDC',
            apy: '18.52%',
            tvl: activeVaultsTotalValueLocked['USDC'],
            userBalance: getBalance('USDC'),
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
            tvl: activeVaultsTotalValueLocked['FRAX'],
            userBalance: getBalance('FRAX'),
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
            tvl: activeVaultsTotalValueLocked['USDT'],
            userBalance: getBalance('USDT'),
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
            tvl: activeVaultsTotalValueLocked['solar3POOL'],
            holdings: '--',
            userBalance: getBalance('solar3POOL'),
            isOpen: false,
            strategy: 'Solarbeam',
            suffix: 'LP',
            getSomeUrl:
              'https://app.solarbeam.io/exchange/stable-pool/add/3pool',
            contracts: poolAddresses['Solarbeam3pool']
          },
          {
            icon: '/static/tokens/frax3pool.svg',
            name: 'solar3FRAX',
            apy: '48.823%',
            holdings: '--',
            tvl: activeVaultsTotalValueLocked['solar3FRAX'],
            userBalance: getBalance('solar3FRAX'),
            isOpen: false,
            strategy: 'Solarbeam',
            suffix: 'LP',
            getSomeUrl:
              'https://app.solarbeam.io/exchange/stable-pool/add/frax-3pool',
            contracts: poolAddresses['SolarbeamFrax3pool']
          },
          {
            icon: '/static/tokens/2ksm.svg',
            name: 'solarstKSM',
            apy: '8.823%',
            tvl: activeVaultsTotalValueLocked['solarstKSM'],
            holdings: '--',
            userBalance: getBalance('solarstKSM'),
            isOpen: false,
            strategy: 'Solarbeam',
            suffix: 'LP',
            getSomeUrl:
              'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
            contracts: poolAddresses['SolarbeamstKSMpool']
          }
        ]
        console.log('FINAL VAULT DATA 2', vaultData2)
        setApyList(vaultData2)
      }
    }
    getAllData()
  }, [account?.address])

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
