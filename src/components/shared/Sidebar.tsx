import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const LINKS = [
  {
    name: 'Home',
    path: '/home',
    icon: '/static/sidebar/home-icon.png'
  },
  {
    name: 'Vaults',
    path: '/',
    icon: '/static/sidebar/vaults-icon.png'
  },
  {
    name: 'Staking',
    path: '/staking',
    icon: '/static/sidebar/staking-icon.png'
  },
  {
    name: 'Loans',
    path: '/loans',
    icon: '/static/sidebar/loans-icon.png'
  },
  {
    name: 'Bonds',
    path: '/bonds',
    icon: '/static/sidebar/bonds-icon.png'
  }
]

const Sidebar = () => {
  const router = useRouter()

  const isActivePath = (path: string) => router.pathname === path

  return (
    <div className="fixed z-10 w-[10rem] bg-white rounded-lg top-4 h-[96%]">
      <div className="flex items-center p-3 space-x-2">
        <img src="/chewy-header-logo.png" className="h-7" alt="" />
      </div>
      <ul className="p-3 mt-14 text-[19px]">
        {LINKS.map(({ path, name, icon }, idx) => (
          <li
            key={idx}
            className={clsx('mt-1 p-2 group rounded-lg', {
              'bg-[#f7f7f7]': isActivePath(path),
              'hover:bg-[#f7f7f7]': !isActivePath(path)
            })}
          >
            <Link href="/">
              <a
                className={clsx(
                  'flex items-center space-x-2 font-medium hover:opacity-100'
                )}
              >
                <img src={icon} className="w-8 h-8" alt={name} />
                <span
                  className={clsx('group-hover:opacity-100', {
                    'text-black': isActivePath(path),
                    'hover:bg-[#f7f7f7] hover:opacity-100 group-hover:text-black text-[#cfcfcf]':
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
