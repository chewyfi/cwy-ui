import { createContext } from 'react'
import { poolAddresses } from 'src/chain-info/pool-addresses'
import { APYType } from 'src/types'

export type InitialStateType = {
  apys: APYType[]
}

const initialState = {
  apys: [
    {
      icon: '/static/tokens/movr.svg',
      name: 'MOVR',
      suffix: 'MOVR',
      isOpen: false,
      emoji: '🔥',
      strategy: 'Lending',
      contracts: poolAddresses['MoonbeamMOVR']
    },
    {
      icon: '/static/tokens/weth.svg',
      name: 'WETH',
      suffix: 'WETH',
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddresses['MoonbeamETH']
    },
    {
      icon: '/static/tokens/wbtc.svg',
      name: 'WBTC',
      suffix: 'WBTC',
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddresses['MoonbeamBTCSupplyOnly']
    },
    {
      icon: '/static/tokens/usdc.svg',
      name: 'USDC',
      suffix: 'USDC',
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddresses['MoonbeamUSDC']
    },
    {
      icon: '/static/tokens/frax.svg',
      name: 'FRAX',
      strategy: 'Lending',
      suffix: 'FRAX',
      isOpen: false,
      contracts: poolAddresses['MoonbeamFRAX']
    },
    {
      icon: '/static/tokens/usdt.svg',
      name: 'USDT',
      strategy: 'Lending',
      suffix: 'USDT',
      isOpen: false,
      contracts: poolAddresses['MoonbeamUSDT']
    },
    {
      icon: '/static/tokens/3pool.svg',
      name: 'solar3POOL',
      apy: 'available soon',
      isOpen: false,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/3pool',
      contracts: poolAddresses['Solarbeam3pool']
    },
    {
      icon: '/static/tokens/frax3pool.svg',
      name: 'solar3FRAX',
      apy: 'available soon',
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
      apy: 'available soon',
      isOpen: false,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
      contracts: poolAddresses['SolarbeamstKSMpool']
    }
  ]
}

export const AppContext = createContext<InitialStateType>(initialState)

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  )
}
