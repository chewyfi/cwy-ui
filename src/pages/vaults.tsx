import Layout from 'src/components/shared/Layout'
import Table from 'src/components/Vaults/TableVaults'

export default function Vaults(props: any) {
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
  return {
    props: {
      resPriceFeed: resPriceFeedJson,
      resApyList: resApyListJson
    }
  }
}
