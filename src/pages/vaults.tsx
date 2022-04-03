import Layout from 'src/components/shared/Layout'
import Table from 'src/components/Vaults/TableVaults'

// import db from '../db/db.js'
export default function Vaults(props: any) {
  // db.push('hey')
  return (
    <Layout headerTitle="Vaults">
      <div className="py-4 pb-0 bg-white rounded-lg">
        <Table
          resPriceFeed={props.resPriceFeed}
          resApyList={props.resApyList}
        />
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const resPriceFeed = await fetch('https://chewy-api.vercel.app/prices')
  const resPriceFeedJson = await resPriceFeed.json()
  const resApyList = await fetch('https://chewy-api.vercel.app/apy')
  const resApyListJson = await resApyList.json()
  const mockedRes = {
    'moonwell-usdc-leverage': 0.1337401113977239,
    'moonwell-movr-leverage': 0.5055548104085432,
    'moonwell-usdt-leverage': 0.2656411461037247,
    'moonwell-eth-leverage': 0.07642844172276833,
    'moonwell-frax-leverage': 0.1828348193747143,
    'moonwell-btc-supply': 0.07304095403867654
  }
  return {
    props: {
      resPriceFeed: resPriceFeedJson,
      resApyList: mockedRes
    }
  }
}
