import produce from 'immer'
import { APYType } from 'src/types'

import { InitialStateType } from '.'
import {
  OPEN_MODAL,
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
      }: { network: keyof InitialStateType; vault: string; apy: string } =
        action.payload
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
      }: { network: keyof InitialStateType; vault: string; tvl: string } =
        action.payload

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
      }: { network: keyof InitialStateType; vault: string; deposited: string } =
        action.payload
      const element = draft[network].find(
        (element: APYType) => element.name === vault
      )
      element && deposited ? (element.userDeposited = deposited) : null
      break
    }

    case OPEN_MODAL: {
      const {
        network,
        vault
      }: { network: keyof InitialStateType; vault: string; deposited: string } =
        action.payload
      draft[network].map((element: APYType) =>
        element.name === vault ? (element.isOpen = !element.isOpen) : null
      )
      break
    }

    case SORT_BY_TVL: {
      console.log('SORT BY TVL CALLED')
      draft['apysMoonriver'].sort((a, b) => {
        return parseFloat(b.tvl ? b.tvl : '0') - parseFloat(a.tvl ? a.tvl : '0')
      })
      break
    }

    case SORT_BY_APY:
      draft['apysMoonriver'].sort((a, b) => {
        return parseFloat(b.apy ? b.apy : '0') - parseFloat(a.apy ? a.apy : '0')
      })
      break
    case SORT_BY_DEPOSITED:
      draft['apysMoonriver'].sort((a, b) => {
        return (
          parseFloat(b.userDeposited ? b.userDeposited : '0') -
          parseFloat(a.userDeposited ? a.userDeposited : '0')
        )
      })
      break

    default:
      break
  }
})
