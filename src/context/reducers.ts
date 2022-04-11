import { InitialStateType } from '.'

type Action = {
  type: 'APYS' | 'POOLS'
  payload: any
}

export const reducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case 'APYS':
      return { ...state, apys: action.payload }
    default:
      break
  }
}
