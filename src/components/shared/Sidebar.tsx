import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { HOME } from 'src/utils/paths'

const Sidebar = () => {
  const router = useRouter()

  const isActivePath = (path: string) => router.pathname === path

  return (
    <div className="fixed z-10 w-[10rem] bg-white rounded-lg shadow-sm top-4 h-[96%]">
      <div className="flex items-center p-3 space-x-2">
        <img src="/chewy-header-logo.svg" className="h-6" alt="" />
      </div>
      <ul className="space-y-2 p-3 text-[19px]">
        <li>
          <Link href={HOME}>
            <a
              className={clsx('font-medium hover:opacity-100', {
                'opacity-100': isActivePath(HOME),
                'opacity-40': !isActivePath(HOME)
              })}
            >
              Vaults
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
