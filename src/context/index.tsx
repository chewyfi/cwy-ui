import { createContext } from 'react'
import { poolAddressesAstar } from 'src/chain-info/pool-addresses-astar'
import { poolAddressesMoonriver } from 'src/chain-info/pool-addresses-moonriver'
import { APYType } from 'src/types'

export type InitialStateType = {
  apysMoonriver: APYType[]
  apysAstar: APYType[]
}

const initialState = {
  apysMoonriver: [
    {
      icon: '/static/tokens/movr.svg',
      name: 'MOVR',
      suffix: 'MOVR',
      isOpen: false,
      emoji: '🔥',
      strategy: 'Lending',
      contracts: poolAddressesMoonriver['MoonbeamMOVR']
    },
    {
      icon: '/static/tokens/weth.svg',
      name: 'WETH',
      suffix: 'WETH',
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamETH']
    },
    {
      icon: '/static/tokens/wbtc.svg',
      name: 'WBTC',
      suffix: 'WBTC',
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamBTCSupplyOnly']
    },
    {
      icon: '/static/tokens/usdc.svg',
      name: 'USDC',
      suffix: 'USDC',
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamUSDC']
    },
    {
      icon: '/static/tokens/frax.svg',
      name: 'FRAX',
      strategy: 'Lending',
      suffix: 'FRAX',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamFRAX']
    },
    {
      icon: '/static/tokens/usdt.svg',
      name: 'USDT',
      strategy: 'Lending',
      suffix: 'USDT',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamUSDT']
    },
    {
      icon: '/static/tokens/3pool.svg',
      name: 'solar3POOL',
      isOpen: false,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/3pool',
      contracts: poolAddressesMoonriver['Solarbeam3pool']
    },
    {
      icon: '/static/tokens/frax3pool.svg',
      name: 'solar3FRAX',
      isOpen: false,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl:
        'https://app.solarbeam.io/exchange/stable-pool/add/frax-3pool',
      contracts: poolAddressesMoonriver['SolarbeamFrax3pool']
    },
    {
      icon: '/static/tokens/2ksm.svg',
      name: 'solarstKSM',
      isOpen: false,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
      contracts: poolAddressesMoonriver['SolarbeamstKSMpool']
    }
  ],
  apysAstar: [
    {
      icons: ['/static/tokens/funbeast.svg', '/static/tokens/usdc.svg'],
      name: 'BEAST-USDC',
      strategy: 'Funbeast',
      suffix: 'BEAST-USDC',
      emoji: '🔥',
      isOpen: false,
      contracts: poolAddressesAstar['BEAST-USDC']
    },
    {
      icons: ['/static/tokens/usdt.svg', '/static/tokens/usdc.svg'],
      name: 'USDT-USDC',
      suffix: 'USDT-USDC',
      isOpen: false,
      strategy: 'Funbeast',
      contracts: poolAddressesAstar['USDT-USDC']
    },
    {
      icons: ['/static/tokens/weth.svg', '/static/tokens/wastr.svg'],
      name: 'WETH-WASTR',
      suffix: 'WETH',
      strategy: 'Funbeast',
      isOpen: false,
      contracts: poolAddressesAstar['WETH-WASTR']
    },
    {
      icons: ['/static/tokens/btc.svg', '/static/tokens/wastr.svg'],
      name: 'WBTC-WASTR',
      suffix: 'WBTC-WASTR',
      strategy: 'Funbeast',
      isOpen: false,
      contracts: poolAddressesAstar['WBTC-WASTR']
    },
    {
      icons: ['/static/tokens/usdc.svg', '/static/tokens/wastr.svg'],
      name: 'USDC-WASTR',
      strategy: 'Funbeast',
      suffix: 'USDC-WASTR',
      isOpen: false,
      contracts: poolAddressesAstar['USDC-WASTR']
    },
    {
      icons: ['/static/tokens/funbeast.svg', '/static/tokens/wastr.svg'],
      name: 'BEAST-WASTR',
      strategy: 'Funbeast',
      suffix: 'BEAST-WASTR',
      isOpen: false,
      contracts: poolAddressesAstar['BEAST-WASTR']
    }
  ]
}

export const AppContext = createContext<InitialStateType>(initialState)

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  )
}
