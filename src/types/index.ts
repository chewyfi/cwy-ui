export type APYType = {
  icon?: string | undefined
  icons?: string[]
  name: string
  apy: string | null
  tvl: string | null
  userDeposited: string | null
  userMetamaskBalance: number | null
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
