import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

const footerItems = [
  {
    href: 'https://twitter.com/chewyfi',
    logo: '/static/landing/twitter.svg',
    className: 'w-8 h-8'
  },
  {
    href: 'http://discord.gg/m7TWUjBc9v',
    logo: '/static/landing/discord.svg',
    className: 'w-8 h-8'
  },
  {
    href: 'https://t.me/chewyfi',
    logo: '/static/landing/telegram.svg',
    className: 'w-8 h-8'
  },
  {
    href: 'https://chewyfi.substack.com',
    logo: '/static/landing/substack.svg',
    className: 'w-7 h-7'
  },
  {
    href: 'https://github.com/chewyfi',
    logo: '/static/landing/github.svg',
    className: 'w-8 h-8'
  }
]

export default function Landing() {
  useEffect(() => {
    const element = document.getElementsByTagName('html')[0]
    element.style.setProperty('overflow-y', 'auto', 'important')
  }, [])

  return (
    <div
      style={{
        backgroundImage: 'url(/static/landing/bg-pink.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: '0% 0%',
        objectFit: 'cover'
      }}
      className="grid h-screen !overflow-y-hidden place-items-center"
    >
      <Head>
        <title>Chewy</title>
        <style jsx global>{`
          html {
            overflow: hidden !important;
          }
        `}</style>
      </Head>
      <div className="font-bold text-center text-white">
        <h1 className="text-[51px]">Chewy</h1>
        <p className="text-[20px]">
          Foundational layer for interest-bearing tokens.
        </p>
        <div className="mt-10 mb-8">
          <Link href="https://app.sushi.com/miso">
            <a target="_blank" rel="noreferrer">
              <button className="transition font-bold ease-in-out delay-75 hover:scale-105 duration-200 text-[20px] uppercase text-[#ff6486] py-3 px-16 bg-white rounded-lg shadow">
                Enter the presale
              </button>
            </a>
          </Link>
        </div>
        <div className="flex justify-center space-x-5">
          {footerItems.map((f, idx) => (
            <a
              className="flex items-center"
              target="_blank"
              href={f.href}
              key={idx}
              rel="noreferrer"
            >
              <img src={f.logo} alt="" className={f.className} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
