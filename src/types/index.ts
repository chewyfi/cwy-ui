export type APYType = {
  icon: string
  name: string
  apy: string
  tvl?: string
  holdings: string
  isOpen: boolean
  suffix?: string
  strategy?: string
  userBalance: number
  getSomeUrl?: string
  contracts: {
    Vault: string
    Strategy: string
    Want: string
  }
}
