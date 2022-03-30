import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { Fragment, useEffect, useState } from 'react'
import { APYType } from 'src/types'
import useTxnToast from 'src/utils/hooks/useTxnToast'
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useProvider
} from 'wagmi'

import nativeAbi from '../../chain-info/abis/nativeAbi.json'
import normalAbi from '../../chain-info/abis/normalAbi.json'
import { poolAddresses } from '../../chain-info/pool-addresses'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDC_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from '../../utils/constants'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'
interface Props {
  show: boolean
  onClose: () => void
  item: APYType
}

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

const BalanceModal: React.FC<Props> = (props) => {
  const [depositAmount, setDepositAmount] = useState('1.0')
  const [withdrawAmount, setWithdrawAmount] = useState('1.0')
  const [balanceData, setBalanceData] = useState(0)
  const { txnToast } = useTxnToast()
  const provider = useProvider()

  const [{ data: account }] = useAccount()

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

  const getBalance = (token: string) => {
    switch (token) {
      case 'MOVR':
        return movr?.formatted
      case 'WETH':
        return weth?.formatted
      case 'WBTC':
        return wbtc?.formatted
      case 'USDC':
        let numUSDC = parseFloat(usdc?.formatted || '0') * 10 ** 12
        return numUSDC.toString()
      case 'FRAX':
        return frax?.formatted
      case 'USDT':
        let numUSDT = parseFloat(usdt?.formatted || '0') * 10 ** 12
        return numUSDT.toString()
      case 'solar3POOL':
        return threePool?.formatted
      case 'solar3FRAX':
        return frax3Pool?.formatted
      case 'solarstKSM':
        return solarstKSM?.formatted
    }
  }

  const [{}, writeApprove] = useContractWrite(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Want'],
      contractInterface:
        contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'approve',
    {
      args: [
        contractMappings[props.item.name]['contract']['Vault'],
        BigInt(10000000 * 10 ** contractMappings[props.item.name]['decimals'])
      ]
    }
  )

  const [{ data: allowanceBalance, loading: allowanceLoading }, getAllowance] =
    useContractRead(
      {
        addressOrName: contractMappings[props.item.name]['contract']['Want'],
        contractInterface:
          contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
        signerOrProvider: provider
      },
      'allowance',
      {
        args: [
          account?.address,
          contractMappings[props.item.name]['contract']['Vault']
        ]
      }
    )

  const [{ data: balanceDataUnformatted }, getBalanceUser] = useContractRead(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Vault'],
      contractInterface:
        contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'balanceOf',
    {
      args: ['0x83646b933ee0CfA62363a7F15D7533BF2642f006']
    }
  )

  useEffect(() => {
    const asyncFunc = async () => {
      await getBalanceUser()
      await getAllowance()
    }
    asyncFunc()
  }, [])

  const [{ data, error, loading }, writeDeposit] = useContractWrite(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Vault'],
      contractInterface:
        contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'deposit',
    {
      args: [
        BigInt(
          parseFloat(depositAmount) *
            10 ** contractMappings[props.item.name]['decimals']
        )
      ],
      overrides: {
        gasLimit: '4500000'
      }
    }
  )

  const [
    {
      data: dataDepositBNB,
      error: errorDepositBNB,
      loading: loadingDepositBNB
    },
    writeDepositBNB
  ] = useContractWrite(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Vault'],
      contractInterface: nativeAbi,
      signerOrProvider: provider
    },
    'depositBNB',
    {
      overrides: {
        value: BigInt(5 * 10 ** 17),
        gasLimit: '10500000'
      }
    }
  )

  console.log(
    `DATA BNB ${JSON.stringify(dataDepositBNB)} error ${JSON.stringify(
      errorDepositBNB
    )} loading BNB ${loadingDepositBNB}`
  )

  console.log(`
  data ${JSON.stringify(data)} Error data ${error} loading data ${loading}`)

  const [{}, writeWithdrawAll] = useContractWrite(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Vault'],
      contractInterface:
        contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'withdrawAll',
    {
      overrides: {
        gasLimit: '4500000'
      }
    }
  )

  const [{}, writeWithdrawAmount] = useContractWrite(
    {
      addressOrName: contractMappings[props.item.name]['contract']['Vault'],
      contractInterface:
        contractMappings[props.item.name] !== 'MOVR' ? normalAbi : nativeAbi,
      signerOrProvider: provider
    },
    'withdraw',
    {
      args: [
        BigInt(
          parseFloat(withdrawAmount) *
            10 ** contractMappings[props.item.name]['decimals']
        )
      ],
      overrides: {
        gasLimit: '4500000'
      }
    }
  )

  const depositMaxAmount = async () => {
    let balance = getBalance(props.item.name)!
    setDepositAmount(balance)
    await writeDeposit()
  }

  const approve = async () => {
    if (allowanceBalance) {
      props.item.name === 'MOVR'
        ? await writeDepositBNB()
        : await writeDeposit()

      txnToast(`Deposited ${depositAmount}`, 'https://moonriver.moonscan.io/')
    } else {
      await writeApprove()
      txnToast('Approved', 'https://moonriver.moonscan.io/')
    }
  }
  return (
    <Transition appear show as={Fragment}>
      <Dialog
        open={props.show}
        as="div"
        className={clsx(
          'top-0 bottom-0 overflow-y-scroll z-20 left-0 right-0 min-h-screen flex flex-col items-center justify-center',
          {
            fixed: props.show
          }
        )}
        onClose={props.onClose}
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50" />
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            y: ['-15px', '0px'],
            opacity: 1
          }}
          transition={{
            type: 'keyframes',
            duration: 0.3
          }}
        >
          <div className="relative z-20 flex flex-col items-center max-w-lg mx-4 bg-white border-2 border-gray-200 rounded-2xl lg:mx-0 min-h-30">
            <div className="px-5 py-4">
              {error ? <Alert errorMessage={error.message} /> : null}
              <div className="flex space-x-2">
                <div className="mt-1">
                  <label className="mb-1 text-gray-500 text-[14px]">
                    Balance: {getBalance(props.item.name)?.substring(0, 7)}{' '}
                    {props.item.suffix}
                  </label>
                  <div className="flex items-center text-[14px]">
                    <input
                      value={depositAmount}
                      type="number"
                      step="0.1"
                      min="0"
                      onChange={(e) =>
                        !isNaN(parseFloat(e.target.value))
                          ? setDepositAmount(e.target.value)
                          : 0
                      }
                      className="w-full px-2 py-1 font-semibold border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                    />

                    <button
                      onClick={depositMaxAmount}
                      className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none"
                    >
                      max
                    </button>
                  </div>
                  <button
                    onClick={() => approve()}
                    className="inline-block w-full p-1 mt-1 text-white bg-black border-2 border-black rounded-lg"
                  >
                    {/* {allowanceLoading && <Spinner />} */}
                    {allowanceLoading ? (
                      <Spinner />
                    ) : allowanceBalance ? (
                      'Deposit'
                    ) : (
                      'Approve'
                    )}
                  </button>
                </div>
                <div className="mt-1">
                  <label className="mb-1 text-[14px] text-gray-500">
                    Deposited:{' '}
                    {balanceDataUnformatted &&
                      (
                        parseInt(balanceDataUnformatted.toString(), 16) /
                        (10 *
                          10 ** contractMappings[props.item.name]['decimals'])
                      ).toFixed(2)}
                  </label>
                  <div className="flex items-center text-[14px]">
                    <input
                      step="0.01"
                      min="0"
                      value={withdrawAmount}
                      type="number"
                      onChange={(e) =>
                        !isNaN(parseFloat(e.target.value))
                          ? setWithdrawAmount(e.target.value)
                          : 0
                      }
                      className="w-full px-2 py-1 font-semibold border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                    />
                    <button
                      className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none"
                      onClick={() => {
                        writeWithdrawAll()
                        txnToast(
                          `Withdrawed Total Deposit`,
                          'https://moonriver.moonscan.io/'
                        )
                      }}
                    >
                      max
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      writeWithdrawAmount()
                      txnToast(
                        `Withdrawed ${withdrawAmount}`,
                        'https://moonriver.moonscan.io/'
                      )
                    }}
                    className="inline-block w-full p-1 mt-1 text-gray-400 border-2 border-gray-300 rounded-lg bg-gray-50"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Dialog>
    </Transition>
  )
}

export default BalanceModal
