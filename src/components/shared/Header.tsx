import clsx from 'clsx'
import React from 'react'
import toast from 'react-hot-toast'
import { shortenAddress } from 'src/utils/helpers'
import { useAccount, useNetwork } from 'wagmi'

import NetworkDropdown from '../ui/NetworkDropdown'

const Header = ({
  setShowWalletModal,
  title
}: {
  setShowWalletModal: React.Dispatch<boolean>
  title: string
}) => {
  const [{ data: network }, switchNetwork] = useNetwork()
  const [{ data: accountData }] = useAccount()

  const switchToNetwork = async () => {
    if (switchNetwork) {
      let data = await switchNetwork(1285)
      if (data.error) {
        toast.error(`${data.error.message}, please add network to your wallet.`)
      }
    }
  }

  console.log('Network name ', JSON.stringify(network?.chain?.name))

  return (
    <div className="z-10 text-[15px] bg-white top-0 flex items-center justify-between w-full pb-2 pt-5">
      <div className="flex items-center justify-between w-full mt-2">
        <h6 className="text-[22px] font-medium">{title}</h6>
        <div className="flex items-center">
          <NetworkDropdown
            activeNetwork={network?.chain?.name}
            otherOption={
              network?.chain?.name &&
              ['Moonriver', 'Astar', 'Aurora'].filter(
                (e) => e !== network?.chain?.name
              )
            }
          />
          <button
            onClick={() =>
              network.chain?.unsupported && switchNetwork
                ? switchToNetwork()
                : setShowWalletModal(true)
            }
            className={clsx(
              'px-2 py-1 ml-2 w-36 text-white font-semibold bg-black rounded focus:outline-none',
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
