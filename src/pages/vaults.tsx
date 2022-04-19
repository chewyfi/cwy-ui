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

      let sum = 0.0
      Object.values(activeVaultsTotalValueLocked).forEach(
        (val: any) => (sum += parseFloat(val))
      )
      setTotalTVL(parseFloat(sum.toFixed(2)))
    }
    getTotalTVL()

    if (account?.address) {
      const getTotalDeposits = async () => {
        const { basePath: baseURL } = router

        const { activeVaultsTotalDeposited } = await (
          await fetch(
            `${baseURL}/api/user-deposited-all-price?useraddress=${account?.address}`
          )
        ).json()

        let sum = 0
        Object.values(activeVaultsTotalDeposited).forEach(
          (val: any) => (sum += parseFloat(val))
        )
        setMyDeposits(parseFloat(sum.toFixed(2)))
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
            <p>${myDeposits?.toFixed(2)}</p>
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
    console.log('successfuly used prices')
    if (
      Object.keys(resApyListJson).length !== 9 ||
      Object.values(resApyListJson).includes(null)
    ) {
      console.log(
        'Values not equal to 6 if statement ',
        Object.keys(resApyListJson).length,
        resApyListJson
      )
      resApyListJson = {
        'moonwell-usdc-leverage': 0.0738170409718809,
        'moonwell-movr-leverage': 0.3624081757246836,
        'moonwell-usdt-leverage': 0.16182239266351,
        'moonwell-eth-leverage': 0.0530452880209417,
        'moonwell-frax-leverage': 0.10939141742714727,
        'moonwell-btc-supply': 0.06771444175688035,
        solar3POOL: 9.543339242173845,
        solarstKSM: 51.35319496290187,
        solar3FRAX: 14.432707914902142
      }
      let update = resApyListJson
      resApyListJson = Object.assign({}, resApyListJson, update)
    }
  } catch (error) {
    console.log('Values not equal to 10 catch error ', error)

    resApyListJson = {
      'moonwell-usdc-leverage': 0.0738170409718809,
      'moonwell-movr-leverage': 0.3624081757246836,
      'moonwell-usdt-leverage': 0.16182239266351,
      'moonwell-eth-leverage': 0.0530452880209417,
      'moonwell-frax-leverage': 0.10939141742714727,
      'moonwell-btc-supply': 0.06771444175688035,
      solar3POOL: 0.09543339242173845,
      solarstKSM: 0.5135319496290187,
      solar3FRAX: 0.14432707914902142
    }
  }

  return {
    props: {
      resPriceFeed: resPriceFeedJson,
      resApyList: resApyListJson
    }
  }
}
