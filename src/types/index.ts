export type APYType = {
  icon: string
  name: string
  apy?: string
  tvl?: number
  holdings: string
  isOpen: boolean
  suffix?: string
  strategy?: string
  userBalance?: number
  deposited?: number
  getSomeUrl?: string
  contracts: {
    Vault: string
    Strategy: string
    Want: string
  }
}
