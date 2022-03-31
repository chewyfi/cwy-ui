import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from 'src/components/shared/Layout'

export default function Vaults() {
  const router = useRouter()

  useEffect(() => {
    router.push('vaults')
  }, [])

  return (
    <Layout headerTitle="Home" hideFooter>
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
