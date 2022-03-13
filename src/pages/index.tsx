import SearchIcon from 'src/components/icons/SearchIcon'
import Layout from 'src/components/shared/Layout'
import Table from 'src/components/Vaults/Table'

export default function Home() {
  return (
    <Layout>
      <div className="p-4 mb-4 bg-white rounded-lg shadow-sm">
        <h6 className="text-[19px] mb-4 font-bold text-[#eb4d69]">
          Staking opportunities
        </h6>
        <div className="flex items-center">
          <span className="text-[19px] px-2 py-1 bg-white border-2 border-r-0 border-red-200 rounded-l-lg">
            <SearchIcon />
          </span>
          <input className="text-[15px] w-full pr-2 text-xl border-2 border-l-0 border-red-200 rounded-r-lg outline-none h-7" />
        </div>
        <Table />
      </div>
    </Layout>
  )
}
