export const shortenAddress = (address: string, chars = 4) => {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export const aprToApy = (rate: number) => {
  return (Math.pow(1 + rate / 365, 365) - 1) * 100
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

export const getNetworkLogo = (chainId: number | undefined) => {
  switch (chainId) {
    case 1313161554:
      return '/static/aurora.svg'
    case 1285:
      return '/static/moonriver.svg'
    case 592:
      return '/static/astar.svg'
    default:
      return '/static/moonriver.svg'
  }
}

export const getNetworkName = (chainId: number | undefined) => {
  switch (chainId) {
    case 1313161554:
      return 'Aurora'
    case 1285:
      return 'Moonriver'
    case 592:
      return 'Astar'
    default:
      return 'Moonriver'
  }
}

export const formatMetaMaskBalance = (token: any) => {
  if (token && (token.symbol === 'USDC' || token.symbol === 'USDT')) {
    return (parseFloat(token.formatted) * 10 ** 12).toFixed(2)
  }
  return parseFloat(token?.formatted).toFixed(2)
}

export const roundTo = (n: any, digits: any) => {
  var negative = false
  if (digits === undefined) {
    digits = 0
  }
  if (n < 0) {
    negative = true
    n = n * -1
  }
  var multiplicator = Math.pow(10, digits)
  n = parseFloat((n * multiplicator).toFixed(11))
  n = (Math.round(n) / multiplicator).toFixed(digits)
  if (negative) {
    n = (n * -1).toFixed(digits)
  }
  return n
}
