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

import nativeAbi from '../../../chain-info/abis/nativeAbi.json'
import normalAbi from '../../../chain-info/abis/normalAbi.json'
import { poolAddresses } from '../../../chain-info/pool-addresses'
import {
  FRAX_3POOL_TOKEN_CONTRACT,
  FRAX_TOKEN_CONTRACT,
  THREE_POOL_TOKEN_CONTRACT,
  TWO_KSM_TOKEN_CONTRACT,
  USDC_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
  WBTC_TOKEN_CONTRACT,
  WETH_TOKEN_CONTRACT
} from '../../../utils/constants'
import { Alert } from '../../ui/Alert'
import { Spinner } from '../../ui/Spinner'
import DepositMax from './DepositMax'
import WithdrawMax from './WithdrawMax'
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
  const [depositAmount, setDepositAmount] = useState('0.0')
  const [withdrawAmount, setWithdrawAmount] = useState('0.0')
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
        return movr?.formatted ? movr?.formatted : '0'
      case 'WETH':
        return weth?.formatted ? weth?.formatted : '0'
      case 'WBTC':
        return wbtc?.formatted ? wbtc?.formatted : '0'
      case 'USDC':
        let numUSDC = parseFloat(usdc?.formatted || '0') * 10 ** 12
        return numUSDC ? numUSDC.toString() : '0'
      case 'FRAX':
        return frax?.formatted ? frax?.formatted : '0'
      case 'USDT':
        let numUSDT = parseFloat(usdt?.formatted || '0') * 10 ** 12
        return numUSDT ? numUSDT.toString() : '0'
      case 'solar3POOL':
        return threePool?.formatted ? threePool?.formatted : '0'
      case 'solar3FRAX':
        return frax3Pool?.formatted ? frax3Pool?.formatted : '0'
      case 'solarstKSM':
        return solarstKSM?.formatted ? solarstKSM?.formatted : '0'
    }
  }

  const [{ data: dataApproved }, writeApprove] = useContractWrite(
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

  const [
    {
      data: allowanceBalance,
      loading: allowanceLoading,
      error: allowanceError
    },
    getAllowance
  ] = useContractRead(
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

  console.log(
    `Allowance balance ${allowanceBalance} error ${allowanceError} address`
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
      args: [account?.address]
    }
  )

  const [{ data: dataDeposit, error: depositError, loading }, writeDeposit] =
    useContractWrite(
      {
        addressOrName: contractMappings[props.item.name]['contract']['Vault'],
        contractInterface: normalAbi,
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
        value: BigInt(
          parseFloat(depositAmount) *
            10 ** contractMappings[props.item.name]['decimals']
        ),
        gasLimit: '10500000'
      }
    }
  )

  const [{ data: dataWithdrawAmount }, writeWithdrawAmount] = useContractWrite(
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

  const approve = async () => {
    if (allowanceBalance && parseInt(allowanceBalance.toString()) > 0) {
      if (props.item.name === 'MOVR') {
        await writeDepositBNB()
      } else {
        await writeDeposit()
        console.log(`Data deposit ${dataDeposit}`)
      }
    } else {
      await writeApprove()
    }
  }

  useEffect(() => {
    const asyncFunc = async () => {
      await getBalanceUser()
      await getAllowance()
    }
    asyncFunc()
    console.log('Data deposit useffect', dataDeposit)
    if (dataDeposit) {
      txnToast(
        `Deposited ${depositAmount}`,
        `https://moonriver.moonscan.io/tx/${dataDeposit.hash}`
      )
    }

    if (dataApproved) {
      console.log('use effect data approved')
      txnToast('Approved', `https://moonriver.moonscan.io/${dataApproved.hash}`)
    }

    if (dataWithdrawAmount) {
      console.log('IN DATA WITHDRAW ', dataWithdrawAmount)
      txnToast(
        `Withdrawed ${withdrawAmount}`,
        `https://moonriver.moonscan.io/tx/${dataWithdrawAmount.hash}`
      )
    }
  }, [account?.address, dataDeposit, dataWithdrawAmount, dataApproved])

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
              {depositError ? (
                <Alert errorMessage={depositError.message} />
              ) : null}
              <div className="flex space-x-2">
                <div className="mt-1">
                  <label className="mb-1 text-gray-500 text-[14px]">
                    Balance:{' '}
                    {parseFloat(getBalance(props.item.name)!).toFixed(2)}{' '}
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

                    <DepositMax item={props.item} />
                  </div>
                  <button
                    onClick={() => approve()}
                    className="inline-block w-full p-1 mt-1 text-center text-white bg-black border-2 border-black rounded-lg"
                  >
                    {/* {allowanceLoading && <Spinner />} */}
                    {allowanceLoading ? (
                      <Spinner className="mx-auto my-0.5" />
                    ) : allowanceBalance &&
                      parseInt(allowanceBalance.toString()) > 0 ? (
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
                        (balanceDataUnformatted as any) /
                        10 ** contractMappings[props.item.name]['decimals']
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
                    <WithdrawMax item={props.item} />
                  </div>
                  <button
                    onClick={() => {
                      writeWithdrawAmount()
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
