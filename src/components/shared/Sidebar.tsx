import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const LINKS = [
  {
    name: 'Home',
    path: '/',
    icon: '/static/sidebar/home-icon.svg'
  },
  {
    name: 'Vaults',
    path: '/',
    icon: '/static/sidebar/vaults-icon.svg'
  },
  {
    name: 'Staking',
    path: '/',
    icon: '/static/sidebar/staking-icon.svg'
  },
  {
    name: 'Loans',
    path: '/',
    icon: '/static/sidebar/loans-icon.svg'
  },
  {
    name: 'Bonds',
    path: '/',
    icon: '/static/sidebar/bonds-icon.svg'
  }
]

const Sidebar = () => {
  const router = useRouter()

  const isActivePath = (path: string) => router.pathname === path

  return (
    <div className="fixed z-10 w-[10rem] bg-white rounded-lg top-4 h-[96%]">
      <div className="flex items-center p-3 space-x-2">
        <img src="/chewy-header-logo.svg" className="h-6" alt="" />
      </div>
      <ul className="p-3 mt-16 text-[16px]">
        {LINKS.map(({ path, name, icon }, idx) => (
          <li
            key={idx}
            className={clsx('mt-1 p-2 group rounded-lg', {
              'bg-gray-50': isActivePath(path),
              'hover:bg-gray-50': !isActivePath(path)
            })}
          >
            <Link href={path}>
              <a
                className={clsx(
                  'flex items-center space-x-2 font-semibold hover:opacity-100'
                )}
              >
                <img src={icon} className="w-5 h-5" alt={name} />
                <span
                  className={clsx('group-hover:opacity-100', {
                    'opacity-100': isActivePath(path),
                    'hover:bg-gray-50 hover:opacity-100 opacity-40':
                      !isActivePath(path)
                  })}
                >
                  {name}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
