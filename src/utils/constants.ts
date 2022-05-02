import { poolAddressesAstar } from 'src/chain-info/network-addreses/pool-addresses-astar'
import { poolAddressesAurora } from 'src/chain-info/network-addreses/pool-addresses-aurora'
import { poolAddressesMoonriver } from 'src/chain-info/network-addreses/pool-addresses-moonriver'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const CWY_DOCS_URL = 'https://docs.cwy.money'
export const CWY_BLOG_URL = 'https://blog.cwy.money'
export const CWY_AUDITS_URL = 'https://docs.cwy.money/safety/audits'
export const CWY_TWITTER_URL = 'https://twitter.com/cwydotmoney'
export const CWY_BUG_BOUNTY_URL = 'https://docs.cwy.money/safety/bug-bounty'
export const CWY_FORUM_URL = 'https://gov.cwy.money'
export const CWY_SNAPSHOT_URL = 'https://snapshot.cwy.money'
export const CWY_DISCORD_URL = 'https://discord.gg/m7TWUjBc9v'
export const CWY_GITHUB_URL = 'https://github.com/cwydotmoney'

export const WETH_TOKEN_CONTRACT = '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C'
export const USDT_TOKEN_CONTRACT = '0xB44a9B6905aF7c801311e8F4E76932ee959c663C'
export const USDC_TOKEN_CONTRACT = '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D'
export const FRAX_TOKEN_CONTRACT = '0x1A93B23281CC1CDE4C4741353F3064709A16197d'
export const WBTC_TOKEN_CONTRACT = '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8'
export const TWO_KSM_TOKEN_CONTRACT =
  '0x493147C85Fe43F7B056087a6023dF32980Bcb2D1'
export const THREE_POOL_TOKEN_CONTRACT =
  '0xfb29918d393AaAa7dD118B51A8b7fCf862F5f336'
export const FRAX_3POOL_TOKEN_CONTRACT =
  '0x884609A4D86BBA8477112E36e27f7A4ACecB3575'
export const KBTC_BTC_TOKEN_CONTRACT =
  '0x4F707d051b4b49B63e72Cc671e78E152ec66f2fA'

export const MoonbeamMOVRDecimals = 18
export const MoonbeamETHDecimals = 18
export const MoonbeamBTCSupplyOnlyDecimals = 8
export const MoonbeamUSDCDecimals = 6
export const MoonbeamFRAXDecimals = 18
export const MoonbeamUSDTDecimals = 6
export const Solarbeam3poolDecimals = 18
export const SolarbeamFrax3poolDecimals = 18
export const SolarbeamstKSMpoolDecimals = 18

export const networkMappings: { 1285: string; 1313161554: string } = {
  1285: 'Moonriver',
  1313161554: 'Aurora'
}

export const contractMappings: any = {
  Moonriver: {
    MOVR: { contract: poolAddressesMoonriver['MoonbeamMOVR'], decimals: 18 },
    WETH: { contract: poolAddressesMoonriver['MoonbeamETH'], decimals: 18 },
    WBTC: {
      contract: poolAddressesMoonriver['MoonbeamBTCSupplyOnly'],
      decimals: 8
    },
    USDC: { contract: poolAddressesMoonriver['MoonbeamUSDC'], decimals: 6 },
    FRAX: { contract: poolAddressesMoonriver['MoonbeamFRAX'], decimals: 18 },
    USDT: { contract: poolAddressesMoonriver['MoonbeamUSDT'], decimals: 6 },
    '3POOL': {
      contract: poolAddressesMoonriver['Solarbeam3pool'],
      decimals: 18
    },
    FRAX3POOL: {
      contract: poolAddressesMoonriver['SolarbeamFrax3pool'],
      decimals: 18
    },
    'KSM-stKSM': {
      contract: poolAddressesMoonriver['SolarbeamstKSMpool'],
      decimals: 18
    },
    'KBTC-BTC': {
      contract: poolAddressesMoonriver['KBTC-BTC'],
      decimals: 18
    }
  },
  Astar: {
    'USDT-USDC': {
      contract: poolAddressesAstar['USDT-USDC'],
      decimals: 18
    },
    'WETH-WASTR': {
      contract: poolAddressesAstar['WETH-WASTR'],
      decimals: 18
    },
    'WBTC-WASTR': {
      contract: poolAddressesAstar['WBTC-WASTR'],
      decimals: 18
    },
    'USDC-WASTR': {
      contract: poolAddressesAstar['USDC-WASTR'],
      decimals: 18
    },
    'BEAST-USDC': {
      contract: poolAddressesAstar['BEAST-USDC'],
      decimals: 18
    },
    'BEAST-WASTR': {
      contract: poolAddressesAstar['BEAST-WASTR'],
      decimals: 18
    }
  },
  Aurora: {
    STABLES: {
      contract: poolAddressesAurora['STABLES'],
      decimals: 18
    },
    'STABLES-UST': {
      contract: poolAddressesAurora['STABLES-UST'],
      decimals: 18
    },
    'STABLES-FRAX': {
      contract: poolAddressesAurora['STABLES-FRAX'],
      decimals: 18
    },
    'STABLES-MAI': {
      contract: poolAddressesAurora['STABLES-MAI'],
      decimals: 18
    },
    'STABLES-BUSD': {
      contract: poolAddressesAurora['STABLES-BUSD'],
      decimals: 18
    },
    'STABLES-RUSD': {
      contract: poolAddressesAurora['STABLES-RUSD'],
      decimals: 18
    }
  }
}

export const priceFeedMappings: any = {
  FRAX: 'FRAX',
  USDC: 'USDC',
  USDT: 'USDT',
  WBTC: 'bitcoin',
  WETH: 'ethereum',
  MOVR: 'moonriver',
  '3POOL': '3pool',
  FRAX3POOL: 'FRAX-3pool',
  'KSM-stKSM': 'KSM-pool'
}

export const apyMappings: any = {
  Moonriver: {
    USDC: 'moonwell-usdc-leverage',
    MOVR: 'moonwell-movr-leverage',
    USDT: 'moonwell-usdt-leverage',
    WETH: 'moonwell-eth-leverage',
    FRAX: 'moonwell-frax-leverage',
    WBTC: 'moonwell-btc-supply',
    FRAX3POOL: 'FRAX3POOL',
    'KSM-stKSM': 'KSM-stKSM',
    '3POOL': '3POOL',
    'KBTC-BTC': 'KBTC-BTC'
  },
  Astar: {
    'USDT-USDC': null,
    'WETH-WASTR': null,
    'WBTC-WASTR': null,
    'USDC-WASTR': null,
    'BEAST-USDC': null
  },
  Aurora: {
    'Stables Farm': 'STABLES',
    'Frax Farm': 'STABLES-FRAX',
    'UST Farm': 'STABLES-UST',
    'BUSD Farm': 'STABLES-BUSD',
    'MAI Farm': 'STABLES-MAI',
    'RUSD Farm': 'STABLES-RUSD'
  }
}
