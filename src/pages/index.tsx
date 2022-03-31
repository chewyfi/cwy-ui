import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from 'src/components/shared/Layout'

export default function Vaults() {
  const router = useRouter()

  useEffect(() => {
    router.push('vaults')
  }, [])

  return (
    <Layout hideFooter>
      <div className="grid h-full mt-8 place-items-center">
        <div className="font-bold">Coming soon</div>
      </div>
    </Layout>
  )
}
