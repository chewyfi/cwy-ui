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
    <div className="flex px-20 py-10 bg-white rounded-lg">
      <div className="flex items-center space-x-10">
        <ul className="flex items-center space-x-6 text-[12px] text-gray-500">
          <li>
            <Link href={CWY_TWITTER_URL}>
              <a target="_blank" rel="noreferrer">
                <img
                  src="/static/twitter-logo.svg"
                  draggable={false}
                  className="w-6 h-6"
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
                  className="w-6 h-6"
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
                  className="w-6 h-6"
                  alt=""
                />
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-6 text-[#eb4d69] text-opacity-50">
          <li>
            <Link href={''}>
              <a target="_blank" rel="noreferrer">
                Governance forum
              </a>
            </Link>
          </li>
          <li>
            <Link href={CWY_DOCS_URL}>
              <a target="_blank" rel="noreferrer">
                Docs
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
