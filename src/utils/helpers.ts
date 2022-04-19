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

export const formatMetaMaskBalance = (token: any) => {
  if (token && (token.symbol === 'USDC' || token.symbol === 'USDT')) {
    return (parseFloat(token.formatted) * 10 ** 12).toFixed(2)
  }
  return parseFloat(token?.formatted).toFixed(2)
}
