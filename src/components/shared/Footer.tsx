import Link from 'next/link'
import React from 'react'
import {
  CWY_DISCORD_URL,
  CWY_DOCS_URL,
  CWY_GITHUB_URL,
  CWY_TWITTER_URL
} from 'src/utils/constants'

const Footer = () => {
  return (
    <div className="flex px-16 h-[10rem] bg-white rounded-lg">
      <div className="flex items-center space-x-16">
        <ul className="flex items-center space-x-2 text-[12px] text-gray-500">
          <li>
            <Link href={CWY_TWITTER_URL}>
              <a target="_blank" rel="noreferrer">
                <img
                  src="/static/twitter-logo.svg"
                  draggable={false}
                  className="h-7"
                  alt=""
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href={CWY_DISCORD_URL}>
              <a target="_blank" rel="noreferrer">
                <img
                  src="/static/discord-logo.svg"
                  className="h-7"
                  alt=""
                  draggable={false}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href={CWY_GITHUB_URL}>
              <a target="_blank" rel="noreferrer">
                <img
                  draggable={false}
                  src="/static/github-logo.svg"
                  className="h-8"
                  alt=""
                />
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-8 text-[#ffc3ce] font-medium text-[13px] text-opacity-90">
          <li>
            <Link href={CWY_DOCS_URL}>
              <a target="_blank" rel="noreferrer">
                Docs
              </a>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <a target="_blank" rel="noreferrer">
                Audits
              </a>
            </Link>
          </li>
          <li>
            <Link href={''}>
              <a target="_blank" rel="noreferrer">
                Bug bounty
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
