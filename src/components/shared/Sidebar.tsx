import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const LINKS = [
  {
    name: 'Home',
    path: '/',
    icon: '/static/sidebar/home-icon.png'
  },
  {
    name: 'Vaults',
    path: '/vaults',
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
    <div className="fixed z-10 w-[10rem] rounded-lg top-4 h-[96%]">
      <div className="flex items-center px-2 py-3 space-x-2">
        <img src="/chewy-header-logo.png" className="h-8" alt="" />
      </div>
      <ul className="py-3 pr-5 mt-14 text-[19px]">
        {LINKS.map(({ path, name, icon }, idx) => (
          <Link href={path} key={idx} passHref>
            <li
              className={clsx('cursor-pointer mt-1 p-2 group rounded-lg', {
                'bg-[#f7f7f7]': isActivePath(path),
                'hover:bg-[#f7f7f7]': !isActivePath(path)
              })}
            >
              <span
                className={clsx(
                  'flex items-center font-medium hover:opacity-100'
                )}
              >
                <img src={icon} className="w-7 h-7" alt={name} />
                <span
                  className={clsx('ml-2 group-hover:opacity-100', {
                    'text-black': isActivePath(path),
                    'hover:bg-[#f7f7f7] hover:opacity-100 group-hover:text-black text-[#cfcfcf]':
                      !isActivePath(path)
                  })}
                >
                  {name}
                </span>
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
