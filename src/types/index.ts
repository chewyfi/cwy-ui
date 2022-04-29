export type APYType = {
  icon?: string | undefined
  icons?: string[]
  name: string
  apy?: string
  tvl?: string
  userDeposited?: string
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
