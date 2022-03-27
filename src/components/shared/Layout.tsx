import clsx from 'clsx'
import Head from 'next/head'
import React, { useState } from 'react'

import WalletModal from '../WalletModal'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: React.ReactElement }) => {
  const [showWalletModal, setShowWalletModal] = useState(false)

  return (
    <div
      className={clsx('container max-w-3xl mx-auto mb-4', {
        'overflow-hidden h-screen mb-0': showWalletModal
      })}
    >
      <Head>
        <title>Chewy</title>
      </Head>
      <div className={clsx('flex h-full gap-5 px-3')}>
        <WalletModal
          show={showWalletModal}
          onClose={() => setShowWalletModal(false)}
        />
        <Sidebar />
        <div className="w-full pl-[calc(12rem)]">
          <Header setShowWalletModal={setShowWalletModal} />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
