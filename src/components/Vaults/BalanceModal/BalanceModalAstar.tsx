import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { providers } from 'ethers'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { APYType } from 'src/types'
import useTxnToast from 'src/utils/hooks/useTxnToast'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'

import astarAbi from '../../../chain-info/abis/astarAbi.json'
import { contractMappings } from '../../../utils/constants'
import { Alert } from '../../ui/Alert'
import { Spinner } from '../../ui/Spinner'
interface Props {
  show: boolean
  onClose: () => void
  item: APYType
}

function roundTo(n: any, digits: any) {
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

const accountMappings: any = {
  'USDT-USDC': '0x13cC5a0ec3c1561645195b6f3086eAE2a0fb7e8d',
  'WETH-WASTAR': '0x0ADcc0e7F1087665bc4639BdddAeAcE30005910f',
  'WBTC-WASTAR': '0xabC9f3c5F164D751f3A21A60fF5D306D4c44A723',
  'USDC-WASTAR': '0xC4ba558D1700b156a3511F112dFF8b86D108DEE9',
  'BEAST-USDC': '0xC1E0579bAA899E596Ca6d3331E2Da00b3A6b39c3'
}

const BalanceModalAstar: React.FC<Props> = (props) => {
  const [depositAmount, setDepositAmount] = useState<string>('')
  const [withdrawAmount, setWithdrawAmount] = useState<string>('')
  const [withdrawMax, setWithdrawMax] = useState(false)
  const { txnToast } = useTxnToast()
  const provider = new providers.StaticJsonRpcProvider(
    'https://astar.blastapi.io/81297d7f-8827-4a29-86f1-a2dc3ffbf66b',
    {
      chainId: 592,
      name: 'Astar'
    }
  )
  const router = useRouter()

  const [{ data: account }] = useAccount()

  // const [{ data: metaMaskBalance }] = useBalance({
  //   token: accountMappings[props.item.name],
  //   addressOrName: account?.address
  // })

  const metaMaskBalance = {
    value: 1,
    decimals: 18
  }

  console.log(`Meta mask balance ${JSON.stringify(metaMaskBalance?.value)}`)

  const formatMetaMaskBalance = (token: any) => {
    // if (token && (token.symbol === 'USDC' || token.symbol === 'USDT')) {
    //   return (parseFloat(token.formatted) * 10 ** 12).toFixed(2)
    // }
    if (metaMaskBalance?.decimals && token?.value) {
      console.log(
        'Formatted metamask balance ',
        (parseFloat(token?.value) / 10 ** metaMaskBalance?.decimals)
          .toFixed(2)
          .toString()
      )
      return (parseFloat(token?.value) / 10 ** metaMaskBalance?.decimals)
        .toFixed(2)
        .toString()
    }
  }
  const [{ data: dataApproved }, writeApprove] = useContractWrite(
    {
      addressOrName:
        contractMappings['Astar'][props.item.name]['contract']['lp'],
      contractInterface: astarAbi,
      signerOrProvider: provider
    },
    'approve',
    {
      args: [
        contractMappings['Astar'][props.item.name]['contract']['Vault'],
        BigInt(
          1000000000 *
            10 ** contractMappings['Astar'][props.item.name]['decimals']
        )
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
      addressOrName:
        contractMappings['Astar'][props.item.name]['contract']['lp'],
      contractInterface: astarAbi,
      signerOrProvider: provider
    },
    'allowance',
    {
      args: [
        account?.address,
        contractMappings['Astar'][props.item.name]['contract']['Vault']
      ]
    }
  )

  console.log('allowance balance astar ', allowanceBalance)

  const [
    { data: balanceDataUnformatted, loading: balanceDataLoading },
    getBalanceUser
  ] = useContractRead(
    {
      addressOrName:
        contractMappings['Astar'][props.item.name]['contract']['Vault'],
      contractInterface: astarAbi,
      signerOrProvider: provider
    },
    'balanceOf',
    {
      args: [account?.address]
    }
  )

  console.log('BALANCE DATA UNFORMATTED ', balanceDataUnformatted)

  const [
    { data: dataDeposit, error: depositError, loading: depositLoading },
    writeDeposit
  ] = useContractWrite(
    {
      addressOrName:
        contractMappings['Astar'][props.item.name]['contract']['Vault'],
      contractInterface: astarAbi,
      signerOrProvider: provider
    },
    'chewIn',
    {
      args: [
        (
          parseFloat(!depositAmount ? '0' : depositAmount) *
          10 ** contractMappings['Astar'][props.item.name]['decimals']
        ).toString()
      ],
      overrides: {
        gasLimit: '9500000'
      }
    }
  )

  console.log(
    `Data deposit ${JSON.stringify(
      dataDeposit
    )} deposit Error ${depositError} deposit loading ${depositLoading} `
  )
  console.log(
    'DEPOSIT AMOUNT ',
    (
      parseFloat(!depositAmount ? '0' : depositAmount) *
      10 ** contractMappings['Astar'][props.item.name]['decimals']
    ).toString()
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
      addressOrName:
        contractMappings['Astar'][props.item.name]['contract']['Vault'],
      contractInterface: astarAbi,
      signerOrProvider: provider
    },
    'chewIn',
    {
      overrides: {
        value: (
          parseFloat(!depositAmount ? '0' : depositAmount) *
          10 ** contractMappings['Astar'][props.item.name]['decimals']
        ).toString(),
        gasLimit: '10500000'
      }
    }
  )

  const [{ data: dataWithdrawAmount }, writeWithdrawAmount] = useContractWrite(
    {
      addressOrName:
        contractMappings['Astar'][props.item.name]['contract']['Vault'],
      contractInterface: astarAbi,
      signerOrProvider: provider
    },
    'chewOut',
    {
      args: [
        BigInt(
          parseFloat(!withdrawAmount ? '0' : withdrawAmount) *
            10 ** contractMappings['Astar'][props.item.name]['decimals']
        )
      ],
      overrides: {
        gasLimit: '9500000'
      }
    }
  )

  const [{ data: dataWithdrawAmountMax }, writeWithdrawAmountMax] =
    useContractWrite(
      {
        addressOrName:
          contractMappings['Astar'][props.item.name]['contract']['Vault'],
        contractInterface: astarAbi,
        signerOrProvider: provider
      },
      'chewAllOut',
      {
        overrides: {
          gasLimit: '9500000'
        }
      }
    )

  const approve = async () => {
    if (
      // localStorage.getItem(`props.item.name${account?.address}`) ||
      allowanceBalance &&
      parseInt(allowanceBalance.toString()) > 0
    ) {
      console.log('wrote deposit')
      await writeDeposit()
    } else {
      console.log('wrote withdraw')
      await writeApprove()
      // localStorage.setItem(`props.item.name${account?.address}`, '1')
    }
  }

  useEffect(() => {
    const asyncFunc = async () => {
      await getBalanceUser()
      await getAllowance()
    }
    asyncFunc()
    if (dataDeposit) {
      txnToast(
        `Deposited ${depositAmount}`,
        `https://blockscout.com/tx/${dataDeposit.hash}`
      )
    }
    if (dataWithdrawAmountMax) {
      txnToast(
        `Withdrew Contract Balance`,
        `https://blockscout.com/astar/tx/${dataWithdrawAmountMax.hash}`
      )
    }

    if (dataApproved) {
      txnToast(
        'Approved',
        `https://blockscout.com/astar/tx/${dataApproved.hash}`
      )
    }

    if (dataWithdrawAmount) {
      txnToast(
        `Withdrawed ${withdrawAmount}`,
        `https://blockscout.com/astar/tx/${dataWithdrawAmount.hash}`
      )
    }

    if (dataDepositBNB) {
      txnToast(
        `Deposited ${depositAmount}`,
        `https://blockscout.com/astar/tx/${dataDepositBNB.hash}`
      )
    }
  }, [
    account?.address,
    dataDeposit,
    dataWithdrawAmount,
    dataApproved,
    dataDepositBNB,
    dataWithdrawAmountMax
  ])

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
                    Balance: {}
                    {formatMetaMaskBalance(metaMaskBalance)} {props.item.name}
                  </label>
                  <div className="flex items-center text-[14px]">
                    <input
                      value={depositAmount}
                      placeholder={'0.0'}
                      type="number"
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full px-2 py-1 font-semibold border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                    />

                    <button
                      onClick={() => {
                        if (metaMaskBalance) {
                          props.item.name === 'USDT' ||
                          props.item.name === 'USDC'
                            ? setDepositAmount(
                                roundTo(
                                  parseInt(metaMaskBalance!.value.toString()) /
                                    10 **
                                      contractMappings['Astar'][
                                        props.item.name
                                      ]['decimals'],
                                  5
                                ).toString()
                              )
                            : setDepositAmount(
                                roundTo(
                                  parseFloat(metaMaskBalance?.formatted),
                                  11
                                )
                              )
                        }
                      }}
                      className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none"
                    >
                      max
                    </button>
                  </div>
                  <button
                    onClick={() => approve()}
                    disabled={
                      allowanceLoading ||
                      (allowanceBalance &&
                        parseInt(allowanceBalance.toString()) > 0 &&
                        !depositAmount)
                    }
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
                        10 **
                          contractMappings['Astar'][props.item.name]['decimals']
                      ).toFixed(2)}
                  </label>
                  <div className="flex items-center text-[14px]">
                    <input
                      step="0.01"
                      min="0"
                      placeholder={'0.0'}
                      value={withdrawAmount}
                      type="number"
                      onChange={(e) => (
                        setWithdrawAmount(e.target.value), setWithdrawMax(false)
                      )}
                      className="w-full px-2 py-1 font-semibold border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                    />
                    <button
                      onClick={() => {
                        setWithdrawAmount(
                          (
                            (balanceDataUnformatted as any) /
                            10 **
                              contractMappings['Astar'][props.item.name][
                                'decimals'
                              ]
                          )
                            .toFixed(2)
                            .toString()
                        )
                        setWithdrawMax(true)
                      }}
                      disabled={!balanceDataUnformatted}
                      className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none"
                    >
                      max
                    </button>{' '}
                  </div>
                  <button
                    disabled={
                      !(
                        allowanceBalance &&
                        parseInt(allowanceBalance.toString()) > 0
                      ) || !withdrawAmount
                    }
                    onClick={() => {
                      if (withdrawMax) {
                        console.log('withdrawing max!')
                        writeWithdrawAmountMax()
                      } else {
                        writeWithdrawAmount()
                      }
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

export default BalanceModalAstar
