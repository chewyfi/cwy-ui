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
    <div className="container h-screen max-w-6xl mx-auto">
      <Head>
        <title>Chewy</title>
      </Head>
      <div
        className={clsx('flex h-full gap-5 px-3', {
          'overflow-hidden': showWalletModal
        })}
      >
        <WalletModal
          show={showWalletModal}
          onClose={() => setShowWalletModal(false)}
        />
        <Sidebar />
        <div className="w-full pl-[calc(11rem)]">
          <Header setShowWalletModal={setShowWalletModal} />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
