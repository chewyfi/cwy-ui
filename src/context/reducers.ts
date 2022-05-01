import produce from 'immer'
import { APYType } from 'src/types'

import { InitialStateType } from '.'
import { SET_USER_METAMASK_BALANCE } from './actions'
import {
  OPEN_MODAL,
  SET_NETWORK_TVL,
  SET_SELECTED_NETWORK,
  SET_TOTAL_TVL,
  SORT_BY_APY,
  SORT_BY_DEPOSITED,
  SORT_BY_TVL,
  UPDATE_APY,
  UPDATE_DEPOSITED,
  UPDATE_TVL
} from './actions'
type Action = {
  type: string
  payload: any
}

export const reducer = produce((draft: InitialStateType, action: Action) => {
  switch (action.type) {
    case UPDATE_APY: {
      const {
        network,
        vault,
        apy
      }: {
        network: 'apysMoonriver' | 'apysAurora'
        vault: string
        apy: string
      } = action.payload

      const element = draft[network].find(
        (element: APYType) => element.name === vault
      )
      element && apy ? (element.apy = apy) : null
      break
    }

    case UPDATE_TVL: {
      const {
        network,
        vault,
        tvl
      }: {
        network: 'apysMoonriver' | 'apysAurora'
        vault: string
        tvl: string
      } = action.payload

      const element = draft[network].find(
        (element: APYType) => element.name === vault
      )
      element && tvl ? (element.tvl = tvl) : null
      break
    }
    case UPDATE_DEPOSITED: {
      const {
        network,
        vault,
        deposited
      }: {
        network: 'apysMoonriver' | 'apysAurora'
        vault: string
        deposited: string
      } = action.payload
      const element = draft[network].find(
        (element: APYType) => element.name === vault
      )

      element && deposited
        ? (element.userDeposited = deposited)
        : (element!.userDeposited = '0.00')
      break
    }

    case OPEN_MODAL: {
      const {
        network,
        vault
      }: {
        network: 'apysMoonriver' | 'apysAurora'
        vault: string
        deposited: string
      } = action.payload
      draft[network].map((element: APYType) =>
        element.name === vault ? (element.isOpen = !element.isOpen) : null
      )
      break
    }

    case SORT_BY_TVL: {
      const {
        network
      }: {
        network: 'apysMoonriver' | 'apysAurora'
      } = action.payload
      console.log('SORT BY TVL NETWORK ', network)
      draft[network].sort((a, b) => {
        return parseFloat(b.tvl ? b.tvl : '0') - parseFloat(a.tvl ? a.tvl : '0')
      })
      break
    }

    case SORT_BY_APY: {
      const { network }: { network: 'apysMoonriver' | 'apysAurora' } =
        action.payload
      draft[network].sort((a, b) => {
        return parseFloat(b.apy ? b.apy : '0') - parseFloat(a.apy ? a.apy : '0')
      })
      break
    }
    case SORT_BY_DEPOSITED: {
      const { network }: { network: 'apysMoonriver' | 'apysAurora' } =
        action.payload
      console.log('SORT BY DEPOSITED CALLED')
      draft[network].sort((a, b) => {
        return (
          parseFloat(b.userDeposited ? b.userDeposited : '0') -
          parseFloat(a.userDeposited ? a.userDeposited : '0')
        )
      })
      console.log('proxy', JSON.parse(JSON.stringify(draft[network])))
      break
    }
    case SET_NETWORK_TVL: {
      const { network }: { network: 'apysMoonriver' | 'apysAurora' } =
        action.payload
      const tvl = draft[network].reduce(
        (a, b) => a + parseFloat(b.tvl ? b.tvl : '0'),
        0
      )
      console.log('MOONRIVER TVL CALCULATED ', tvl)
      draft['moonriverTVL'] = tvl
      break
    }
    case SET_TOTAL_TVL: {
      const tvl = draft['apysAurora'].reduce(
        (a, b) => a + parseFloat(b.tvl ? b.tvl : '0'),
        0
      )
      const tvl2 = draft['apysMoonriver'].reduce(
        (a, b) => a + parseFloat(b.tvl ? b.tvl : '0'),
        0
      )
      console.log('TOTAL TVL CALCULATED ', tvl + tvl2)
      draft['totalTVL'] = tvl + tvl2
      break
    }
    case SET_SELECTED_NETWORK: {
      const { networkId } = action.payload
      console.log('setting network to ', networkId)
      draft['selectedNetwork'] = networkId
      break
    }
    case SET_USER_METAMASK_BALANCE: {
      console.log('setting metamask balance')
      const {
        network,
        vault,
        userMetamaskBalance
      }: {
        network: 'apysMoonriver' | 'apysAurora'
        vault: string
        userMetamaskBalance: number
      } = action.payload
      const element = draft[network].find(
        (element: APYType) => element.name === vault
      )
      element && userMetamaskBalance
        ? (element.userMetamaskBalance = userMetamaskBalance)
        : null
      break
    }
    default:
      break
  }
})
