import clsx from 'clsx'
import React from 'react'
import toast from 'react-hot-toast'
import { shortenAddress } from 'src/utils/helpers'
import { useAccount, useNetwork } from 'wagmi'

import ChevronDown from '../icons/ChevronDown'

const Header = ({
  setShowWalletModal
}: {
  setShowWalletModal: React.Dispatch<boolean>
}) => {
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
    <div className="sticky text-[12px] bg-white top-0 flex items-center justify-between w-full pb-2 pt-5">
      <div className="flex items-center justify-between w-full mt-2">
        <h6 className="text-[19px] font-medium">Vaults</h6>
        <div className="flex items-center">
          {accountData?.address && !network.chain?.unsupported && (
            <button
              onClick={() => setShowWalletModal(true)}
              className="inline-flex font-semibold items-center justify-between px-2 py-1 space-x-2 bg-[#ededed] rounded"
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
              'px-2 py-1 ml-2 text-white font-semibold bg-black rounded focus:outline-none',
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
      </div>
    </div>
  )
}

export default Header
