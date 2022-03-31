import Link from 'next/link'
import React from 'react'
import Layout from 'src/components/shared/Layout'

const staking = () => {
  return (
    <Layout headerTitle="Staking" hideFooter>
      <div className="grid h-full mt-8 place-items-center">
        <div className="text-center">
          <div className="mb-5 font-bold">Coming soon</div>
          <Link href="/vaults">
            <a className="font-semibold underline">Explore Vaults</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default staking
