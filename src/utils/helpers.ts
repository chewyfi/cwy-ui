export const shortenAddress = (address: string, chars = 4) => {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export const getWalletLogo = (name: string) => {
  switch (name) {
    case 'MetaMask':
      return '/static/metamask.svg'
    case 'WalletConnect':
      return '/static/walletconnect.svg'
    default:
      return '/static/metamask.svg'
  }
}
