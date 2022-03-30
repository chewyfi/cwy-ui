import Layout from 'src/components/shared/Layout'
import Table from 'src/components/Vaults/TableVaults'

export default function Vaults() {
  return (
    <Layout>
      <div className="py-4 mb-4 bg-white rounded-lg">
        <Table />
      </div>
    </Layout>
  )
}
