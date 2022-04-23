import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'

import { CloseIcon } from './icons/CloseIcon'
import WalletSelector from './WalletSelector'

interface Props {
  title?: React.ReactNode
  show: boolean
  onClose: () => void
}

const WalletModal: React.FC<Props> = (props) => {
  return (
    <Dialog
      onClose={props.onClose}
      as="div"
      open={props.show}
      className={clsx(
        'top-0 bottom-0 overflow-y-auto z-20 left-0 right-0 min-h-screen flex flex-row items-start justify-center',
        {
          fixed: props.show
        }
      )}
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-60" />
      <motion.div
        className="relative z-20 max-w-lg w-full md:w-1/2 shadow flex flex-col mt-20 rounded-2xl items-center mx-4 bg-white lg:mt-[10%] lg:mx-0 min-h-30"
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
        <div className="flex items-center justify-between w-full p-3 px-4 pb-1">
          <h1 className="opacity-80">Choose your wallet</h1>
          <button
            className="flex items-center justify-center border-gray-700 rounded-lg focus:outline-none"
            onClick={() => props.onClose()}
          >
            <CloseIcon />
          </button>
        </div>
        <WalletSelector onClose={props.onClose} />
      </motion.div>
    </Dialog>
  )
}

export default WalletModal
