import clsx from 'clsx'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { shortenAddress } from 'src/utils/helpers'
import { useAccount, useNetwork } from 'wagmi'

import ChevronDown from '../icons/ChevronDown'
import WalletModal from '../WalletModal'

const Header = () => {
  const [showWalletModal, setShowWalletModal] = useState(false)

  const [{ data: network }, switchNetwork] = useNetwork()
  const [{ data: accountData }] = useAccount()

  const switchToNetwork = async () => {
    if (switchNetwork) {
      let data = await switchNetwork(1285)
      if (data.error) {
        toast.error(`${data.error.message}, please add chain to wallet.`)
      }
    }
  }

  return (
    <div className="sticky text-[12px] bg-gray-100 top-0 flex items-center justify-between w-full pb-2 pt-5">
      <div className="flex items-center justify-between w-full">
        <h6 className="text-[19px] font-semibold">Vaults</h6>
        <div className="flex items-center font-medium">
          {accountData?.address && !network.chain?.unsupported && (
            <button
              onClick={() => setShowWalletModal(true)}
              className="inline-flex items-center justify-between px-2 py-1 space-x-2 bg-[#eb4d6920] rounded"
            >
              <img
                src="/static/moonriver.svg"
                className="w-4 h-4 rounded-full"
                draggable={false}
                alt=""
              />
              <span>{network.chain?.name}</span>
              <ChevronDown />
            </button>
          )}
          <button
            onClick={() =>
              network.chain?.unsupported && switchNetwork
                ? switchToNetwork()
                : setShowWalletModal(true)
            }
            className={clsx(
              'px-2 py-1 ml-2 text-white font-medium bg-black rounded focus:outline-none',
              {
                'bg-red-300 border-0 text-black':
                  network.chain?.unsupported && switchNetwork
              }
            )}
          >
            {accountData?.address && !network.chain?.unsupported ? (
              <span className="mx-2">
                {shortenAddress(accountData.address)}
              </span>
            ) : network.chain?.unsupported && switchNetwork ? (
              <span className="mx-2">Switch Network</span>
            ) : (
              <span className="mx-2">Connect Wallet</span>
            )}
          </button>
        </div>
        <WalletModal
          show={showWalletModal}
          onClose={() => setShowWalletModal(false)}
        />
      </div>
    </div>
  )
}

export default Header
