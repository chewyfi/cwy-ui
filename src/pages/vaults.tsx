import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from 'src/components/shared/Layout'
import TableVault from 'src/components/Vaults/TableVaults'
import { useAccount } from 'wagmi'

// import db from '../db/db.js'

export default function Vaults(props: any) {
  // db.push('hey')
  const [totalTVL, setTotalTVL] = useState(0)
  const [myDeposits, setMyDeposits] = useState<any>(0)
  const router = useRouter()
  const [{ data: account }] = useAccount()

  useEffect(() => {
    const getTotalTVL = async () => {
      const { basePath: baseURL } = router

      const { activeVaultsTotalValueLocked } = await (
        await fetch(`${baseURL}/api/total-value-locked-usd`)
      ).json()
      console.log(`Active value ${activeVaultsTotalValueLocked}`)
      let sum = 0
      Object.values(activeVaultsTotalValueLocked).forEach(
        (val: any) => (sum += parseInt(val))
      )
      console.log('SUM IS ', sum)
      setTotalTVL(sum)
    }
    getTotalTVL()

    if (account?.address) {
      const getTotalDeposits = async () => {
        const { basePath: baseURL } = router

        const { sum } = await (
          await fetch(
            `${baseURL}/api/balance-all?useraddress=${account?.address}`
          )
        ).json()
        setMyDeposits(sum)
      }
      getTotalDeposits()
    }
  }, [account?.address])

  return (
    <Layout headerTitle="Vaults">
      <div className="py-4 pb-0 bg-white rounded-lg">
        <div className="grid w-full grid-cols-3 my-4 text-[#c0c0c0] gap-2">
          <div className="px-4 py-3 bg-[#f7f7f7] text-[17px] rounded-lg">
            <h6>Total TVL </h6>
            <span>${!totalTVL ? null : totalTVL}</span>
          </div>
          <div className="px-4 py-3 bg-[#f7f7f7] text-[17px] rounded-lg">
            <h6>Moonriver TVL</h6>
            <span>${!totalTVL ? null : totalTVL}</span>
          </div>
          <div className="px-4 py-3 bg-[#f7f7f7] text-[17px] rounded-lg">
            <h6>My Deposits</h6>
            <p>${myDeposits.toFixed(2)}</p>
          </div>
        </div>
        <TableVault
          resPriceFeed={props.resPriceFeed}
          resApyList={props.resApyList}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const resPriceFeed = await fetch('https://chewy-api.vercel.app/prices')
  const resPriceFeedJson = await resPriceFeed.json()
  const resApyList = await fetch('https://chewy-api.vercel.app/apy')

  let resApyListJson = {}
  try {
    resApyListJson = await resApyList.json()
  } catch (error) {
    resApyListJson = {
      'moonwell-usdc-leverage': '0.1337401113977239',
      'moonwell-movr-leverage': '0.5055548104085432',
      'moonwell-usdt-leverage': '0.2656411461037247',
      'moonwell-eth-leverage': '0.07642844172276833',
      'moonwell-frax-leverage': '0.1828348193747143',
      'moonwell-btc-supply': '0.07304095403867654'
    }
  }

  return {
    props: {
      resPriceFeed: resPriceFeedJson,
      resApyList: resApyListJson
    }
  }
}
