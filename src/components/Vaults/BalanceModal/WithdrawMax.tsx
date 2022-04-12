import { useEffect } from 'react'
import { poolAddresses } from 'src/chain-info/pool-addresses'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDC_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from 'src/utils/constants'
import useTxnToast from 'src/utils/hooks/useTxnToast'
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useProvider
} from 'wagmi'

import normalAbi from '../../../chain-info/abis/normalAbi.json'
import nativeAbi from '../../../chain-info/abis/normalAbi.json'

const contractMappings: any = {
  MOVR: { contract: poolAddresses['MoonbeamMOVR'], decimals: 18 },
  WETH: { contract: poolAddresses['MoonbeamETH'], decimals: 18 },
  WBTC: { contract: poolAddresses['MoonbeamBTCSupplyOnly'], decimals: 8 },
  USDC: { contract: poolAddresses['MoonbeamUSDC'], decimals: 6 },
  FRAX: { contract: poolAddresses['MoonbeamFRAX'], decimals: 18 },
  USDT: { contract: poolAddresses['MoonbeamUSDT'], decimals: 6 },
  solar3POOL: { contract: poolAddresses['Solarbeam3pool'], decimals: 18 },
  solar3FRAX: { contract: poolAddresses['SolarbeamFrax3pool'], decimals: 18 },
  solarstKSM: { contract: poolAddresses['SolarbeamstKSMpool'], decimals: 18 }
}

const WithdrawMax: React.FC<any> = (props) => {
  const getBalance = (token: string) => {
    switch (token) {
      case 'MOVR':
        return movr?.formatted ? movr?.formatted : '0'
      case 'WETH':
        return weth?.formatted ? weth?.formatted : '0'
      case 'WBTC':
        return wbtc?.formatted ? wbtc?.formatted : '0'
      case 'USDC':
        let numUSDC = parseFloat(usdc?.formatted || '0') * 10 ** 12
        return numUSDC.toString()
      case 'FRAX':
        return frax?.formatted ? frax?.formatted : '0'
      case 'USDT':
        let numUSDT = parseFloat(usdt?.formatted || '0') * 10 ** 12
        return numUSDT.toString()
      case 'solar3POOL':
        return threePool?.formatted ? threePool?.formatted : '0'
      case 'solar3FRAX':
        return frax3Pool?.formatted ? frax3Pool?.formatted : '0'
      case 'solarstKSM':
        return solarstKSM?.formatted ? solarstKSM?.formatted : '0'
    }
  }
  const [{ data: account }] = useAccount()
  const provider = useProvider()
  const { txnToast } = useTxnToast()

  const withdrawMaxAmount = async () => {
    await writeWithdrawAll()
  }

  const [{ data: movr }] = useBalance({
    addressOrName: account?.address
  })
  const [{ data: weth }] = useBalance({
    token: WETH_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: wbtc }] = useBalance({
    token: WBTC_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: usdc }] = useBalance({
    token: USDC_TOKEN_CONTRACT,
    addressOrName: account?.address
  })

  const [{ data: usdt }] = useBalance({
    token: USDT_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: frax }] = useBalance({
    token: FRAX_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: threePool }] = useBalance({
    token: THREE_POOL_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: frax3Pool }] = useBalance({
    token: FRAX_3POOL_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [{ data: solarstKSM }] = useBalance({
    token: TWO_KSM_TOKEN_CONTRACT,
    addressOrName: account?.address
  })
  const [
    {
      data: dataWithdrawMax,
      loading: loadingWithdrawMax,
      error: errorWithdrawMax
    },
    writeWithdrawAll
  ] = useContractWrite(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Vault'],
      contractInterface:
        contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'withdrawAll',
    {
      overrides: {
        gasLimit: '9500000'
      }
    }
  )

  const [
    { data: balanceDataUnformatted, loading: loadingBalanceUser },
    getBalanceUser
  ] = useContractRead(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Vault'],
      contractInterface:
        contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'balanceOf',
    {
      args: [account?.address]
    }
  )

  useEffect(() => {
    if (dataWithdrawMax) {
      const withdrawedAmount = (
        (balanceDataUnformatted as any) /
        10 ** contractMappings[props.item.name]['decimals']
      ).toFixed(2)
      txnToast(
        `Withdrawed Full Deposit Amount: ${withdrawedAmount}`,
        `https://moonriver.moonscan.io/tx/${dataWithdrawMax.hash}`
      )
    }
  }, [dataWithdrawMax])

  return (
    <button
      onClick={withdrawMaxAmount}
      className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none"
    >
      max
    </button>
  )
}

export default WithdrawMax
