import { createContext, useReducer } from 'react'
import { poolAddressesAurora } from 'src/chain-info/network-addreses/pool-addresses-aurora'
import { poolAddressesMoonriver } from 'src/chain-info/network-addreses/pool-addresses-moonriver'
import { APYType } from 'src/types'

import { reducer } from './reducers'

export type InitialStateType = {
  apysMoonriver: APYType[]
  apysAurora: APYType[]
  moonriverTVL: number
  auroraTVL: number
  totalTVL: number
  selectedNetwork: number
}

const initialState = {
  apysMoonriver: [
    {
      icon: '/static/tokens/movr.svg',
      name: 'MOVR',
      suffix: 'MOVR',
      isOpen: false,
      apy: null,
      tvl: null,
      userDeposited: null,
      userMetamaskBalance: null,
      emoji: '🔥',
      strategy: 'Lending',
      contracts: poolAddressesMoonriver['MoonbeamMOVR']
    },
    {
      icon: '/static/tokens/weth.svg',
      name: 'WETH',
      suffix: 'WETH',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamETH']
    },
    {
      icon: '/static/tokens/wbtc.svg',
      name: 'WBTC',
      suffix: 'WBTC',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamBTCSupplyOnly']
    },
    {
      icon: '/static/tokens/usdc.svg',
      name: 'USDC',
      suffix: 'USDC',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      strategy: 'Lending',
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamUSDC']
    },
    {
      icon: '/static/tokens/frax.svg',
      name: 'FRAX',
      strategy: 'Lending',
      suffix: 'FRAX',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamFRAX']
    },
    {
      icon: '/static/tokens/usdt.svg',
      name: 'USDT',
      strategy: 'Lending',
      suffix: 'USDT',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      isOpen: false,
      contracts: poolAddressesMoonriver['MoonbeamUSDT']
    },
    {
      icon: '/static/tokens/3pool.svg',
      name: '3POOL',
      isOpen: false,
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/3pool',
      contracts: poolAddressesMoonriver['Solarbeam3pool']
    },
    {
      icon: '/static/tokens/frax3pool.svg',
      name: 'FRAX3POOL',
      isOpen: false,
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl:
        'https://app.solarbeam.io/exchange/stable-pool/add/frax-3pool',
      contracts: poolAddressesMoonriver['SolarbeamFrax3pool']
    },
    {
      icon: '/static/tokens/2ksm.svg',
      name: 'KSM-stKSM',
      isOpen: false,
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      strategy: 'Solarbeam',
      suffix: 'LP',
      getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
      contracts: poolAddressesMoonriver['SolarbeamstKSMpool']
    },
    {
      icon: '/static/tokens/wbtc.svg',
      name: 'KBTC-BTC',
      isOpen: false,
      strategy: 'Solarbeam',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      suffix: 'LP',
      getSomeUrl: 'https://app.solarbeam.io/exchange/stable-pool/add/stksm',
      contracts: poolAddressesMoonriver['KBTC-BTC']
    }
  ],
  apysAurora: [
    {
      icon: '/static/tokens/rose_stables.svg',
      name: 'STABLES',
      strategy: 'ROSE',
      suffix: 'ROSE',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      emoji: '🔥',
      isOpen: false,
      contracts: poolAddressesAurora['STABLES'],
      getSomeUrl: 'https://app.rose.fi/#/pools/stables'
    },
    {
      icon: 'https://app.rose.fi/static/media/rose-atust.a480f729.svg',
      name: 'STABLES-UST',
      strategy: 'ROSE',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      suffix: 'ROSE',
      emoji: '🔥',
      isOpen: false,

      contracts: poolAddressesAurora['STABLES-UST'],
      getSomeUrl: 'https://app.rose.fi/#/pools/ust'
    },
    {
      icon: '/static/tokens/rose-frax.svg',
      name: 'STABLES-FRAX',
      suffix: 'ROSE',
      strategy: 'Rose',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      isOpen: false,
      contracts: poolAddressesAurora['STABLES-FRAX'],
      getSomeUrl: 'https://app.rose.fi/#/pools/frax'
    },
    {
      icon: 'https://app.rose.fi/static/media/rose-mai.dcd82123.svg',
      name: 'STABLES-MAI',
      suffix: 'ROSE',
      strategy: 'Rose',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      isOpen: false,
      contracts: poolAddressesAurora['STABLES-MAI'],
      getSomeUrl: 'https://app.rose.fi/#/pools/mai'
    },
    {
      icon: 'https://app.rose.fi/static/media/rose-busd.07b2b924.svg',
      name: 'STABLES-BUSD',
      strategy: 'Rose',
      suffix: 'BUSD',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      isOpen: false,
      contracts: poolAddressesAurora['STABLES-BUSD'],
      getSomeUrl: 'https://app.rose.fi/#/pools/busd'
    },
    {
      icon: 'https://app.rose.fi/static/media/rose.54bf1c83.svg',
      name: 'STABLES-RUSD',
      strategy: 'Rose',
      suffix: 'RUSD',
      userDeposited: null,
      userMetamaskBalance: null,
      apy: null,
      tvl: null,
      isOpen: false,
      contracts: poolAddressesAurora['STABLES-RUSD'],
      getSomeUrl: 'https://app.rose.fi/#/pools/rusd'
    }
  ],
  moonriverTVL: 0,
  auroraTVL: 0,
  totalTVL: 0,
  selectedNetwork: 1285
}

export const AppContext = createContext<any>(initialState)

export const AppProvider: React.FC = ({ children }) => {
  const [globalState, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ globalState, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
