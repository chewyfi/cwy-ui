import Layout from 'src/components/shared/Layout'
import Table from 'src/components/Vaults/TableVaults'

export default function Vaults() {
  return (
    <Layout headerTitle="Vaults">
      <div className="py-4 pb-0 bg-white rounded-lg">
        <Table />
      </div>
    </Layout>
  )
}
