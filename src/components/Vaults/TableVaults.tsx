import React, { useState } from 'react'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from 'src/utils/constants'
import { useAccount, useBalance, useContractWrite, useProvider } from 'wagmi'

import normalAbi from '../../chain-info/abis/normalAbi.json'
import { poolAddresses } from '../../chain-info/pool-addresses'
import { TableHeader } from './TableHeader'
import { Vault } from './Vault'
const APYS = [
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
  const approve = async (contracts, provider) => {
    console.log('Approve clicked!')
    await writeApprove()
    console.log(`Data ${data} Error ${error} Loading ${loading}`)
  }
  const provider = useProvider()

  const [{ data, error, loading }, writeApprove] = useContractWrite(
    {
      addressOrName: poolAddresses['MoonbeamFRAX']['Want'],
      contractInterface: normalAbi,
      signerOrProvider: provider
    },
    'approve',
    {
      args: [poolAddresses['MoonbeamFRAX']['Vault'], (10 ** 20).toString()]
    }
  )

  console.log(`Outside func Data ${data} Error ${error} Loading ${loading}`)

  const [apyList, setApyList] = useState(APYS)

  const [{ data: account }] = useAccount()

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
    token: WBTC_TOKEN_CONTRACT,
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
        return movr?.formatted
      case 'WETH':
        return weth?.formatted
      case 'WBTC':
        return wbtc?.formatted
      case 'USDC':
        return usdc?.formatted
      case 'FRAX':
        return frax?.formatted
      case 'USDT':
        return usdt?.formatted
      case 'solar3POOL':
        return threePool?.formatted
      case 'solar3FRAX':
        return frax3Pool?.formatted
      case 'solarstKSM':
        return solarstKSM?.formatted
    }
  }
  const toggleDisclosure = (index: number) => {
    let apys = apyList
    apys.map((item, idx) => {
      if (idx === index) {
        item.isOpen = !item.isOpen
      } else {
        item.isOpen = false
      }
    })
    setApyList(JSON.parse(JSON.stringify(apys)))
  }

  return (
    <div className="w-full my-4">
      <TableHeader />
      <div>
        {apyList.map((item, idx) => (
          <Vault
            key={idx}
            item={item}
            idx={idx}
            balance={getBalance(item.name)}
          />
        ))}
      </div>
    </div>
  )
}

export default Table
