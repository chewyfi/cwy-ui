import '../styles/globals.css'
import '../styles/font.css'

import { providers } from 'ethers'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from 'src/components/ErrorBoundary'
import { AppProvider } from 'src/context'
import { Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string

const supportedChains = [
  {
    id: 1285,
    name: 'Moonriver',
    nativeCurrency: { name: 'Moonriver', symbol: 'MOVR', decimals: 18 },
    rpcUrls: ['https://rpc.api.moonriver.moonbeam.network'],
    blockExplorers: [
      { name: 'Moonscan', url: 'https://moonriver.moonscan.io' }
    ],
    testnet: false
  },
  {
    id: 592,
    name: 'Astar',
    nativeCurrency: { name: 'Astar', symbol: 'ASTR', decimals: 18 },
    rpcUrls: ['https://rpc.astar.network:8545'],
    blockExplorers: [
      { name: 'Block Scout', url: 'https://blockscout.com/astar/' }
    ],
    testnet: false
  }
]

const connectors = () => {
  return [
    // @ts-ignore
    new InjectedConnector({ chains: supportedChains }),
    new WalletConnectConnector({
      options: {
        rpc: {
          1285: rpcUrl
        },
        qrcode: true
      }
    })
  ]
}

const providerMoonriver = () =>
  new providers.StaticJsonRpcProvider(rpcUrl, {
    chainId: 1285,
    name: 'moonriver'
  })

const providerAstar = new providers.StaticJsonRpcProvider(
  'https://astar.blastapi.io/81297d7f-8827-4a29-86f1-a2dc3ffbf66b5',
  {
    chainId: 592,
    name: 'Astar'
  }
)

const allProviders: any = [providerAstar, providerMoonriver]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Provider
          autoConnect
          connectorStorageKey="chewy.wallet"
          connectors={connectors}
          provider={providerAstar}
        >
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </Provider>
      </AppProvider>
    </ErrorBoundary>
  )
}
export default MyApp
