import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Layout from 'src/components/shared/Layout'
import TableVault from 'src/components/Vaults/TableVaults'
import { AppContext } from 'src/context'
import { useAccount, useNetwork } from 'wagmi'

// import db from '../db/db.js'

export default function Vaults(props: any) {
  // db.push('hey')
  const [myDeposits, setMyDeposits] = useState<any>(0)
  const [{ data: account }] = useAccount()
  const [{ data: network }, switchNetwork] = useNetwork()
  const router = useRouter()
  const { dispatch, globalState } = useContext(AppContext)

  const [networkTVL, setNetworkTVL] = useState(0)
  const [moonriverTVL, setMoonriverTVL] = useState(0)
  const [auroraTVL, setAuroraTVL] = useState(0)

  const [totalTVL, setTotalTVL] = useState(0)

  useEffect(() => {
    if (globalState.selectedNetwork != network?.chain?.id) {
      ;(async function () {
        console.log('self executing')
        switchNetwork && (await switchNetwork(globalState.selectedNetwork))
      })()
    }

    const fetchSpecificTVL = async () => {
      const { basePath: baseURL } = router
      switch (globalState.selectedNetwork) {
        case 1285: {
          const { sum } = await (
            await fetch(`${baseURL}/api/get-tvl-moonriver`)
          ).json()
          setMoonriverTVL(sum)
        }
        case 1313161554: {
          const { sum } = await (
            await fetch(`${baseURL}/api/get-tvl-aurora`)
          ).json()
          setAuroraTVL(sum)
        }
      }
    }
    fetchSpecificTVL()
  }, [globalState.selectedNetwork, network?.chain?.id])

  return (
    <Layout headerTitle="Vaults">
      <div className="py-4 pb-0 bg-white rounded-lg">
        <div className="grid w-full grid-cols-3 my-4 text-[#c0c0c0] gap-2">
          <div className="px-4 py-3 bg-[#f7f7f7] text-[17px] rounded-lg">
            <h6>Total TVL </h6>
            <span>${(moonriverTVL + auroraTVL).toFixed(2)}</span>
          </div>
          <div className="px-4 py-3 bg-[#f7f7f7] text-[17px] rounded-lg">
            <h6>
              {globalState.selectedNetwork === 1285 ? 'Moonriver' : 'Aurora'}{' '}
              TVL
            </h6>
            <span>
              $
              {globalState.selectedNetwork === 1285
                ? moonriverTVL.toFixed(2)
                : auroraTVL.toFixed(2)}
            </span>
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
      // console.log(
      //   'Values not equal to 6 if statement ',
      //   Object.keys(resApyListJson).length,
      //   resApyListJson
      // )
      resApyListJson = {
        'moonwell-usdc-leverage': 0.0738170409718809,
        'moonwell-movr-leverage': 0.3624081757246836,
        'moonwell-usdt-leverage': 0.16182239266351,
        'moonwell-eth-leverage': 0.0530452880209417,
        'moonwell-frax-leverage': 0.10939141742714727,
        'moonwell-btc-supply': 0.06771444175688035,
        '3POOL': 0.09543339242173845,
        'KSM-stKSM': 0.5135319496290187,
        FRAX3POOL: 0.14432707914902142,
        'KBTC-BTC': 0.2068
      }
      let update = resApyListJson
      resApyListJson = Object.assign({}, resApyListJson, update)
    } else {
      resApyListJson = Object.assign({}, resApyListJson, {
        'KBTC-BTC': 0.2068
      })
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
      '3POOL': 0.09543339242173845,
      'KSM-stKSM': 0.5135319496290187,
      FRAX3POOL: 0.14432707914902142
    }
  }

  return {
    props: {
      resPriceFeed: resPriceFeedJson,
      resApyList: resApyListJson
    }
  }
}
