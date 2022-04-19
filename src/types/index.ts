export type APYType = {
  icon?: string
  name?: string
  apy?: string
  tvl?: string
  emoji?: string
  isOpen: boolean
  suffix?: string
  strategy?: string
  getSomeUrl?: string
  contracts: {
    Vault: string
    Strategy: string
    Want?: string
    lp?: string
  }
}
