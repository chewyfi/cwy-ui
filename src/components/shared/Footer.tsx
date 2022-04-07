import Link from 'next/link'
import React from 'react'
import {
  CWY_AUDITS_URL,
  CWY_BLOG_URL,
  CWY_BUG_BOUNTY_URL,
  CWY_DISCORD_URL,
  CWY_DOCS_URL,
  CWY_FORUM_URL,
  CWY_SNAPSHOT_URL,
  CWY_TWITTER_URL
} from 'src/utils/constants'

const Footer = () => {
  return (
    <div className="flex h-[10rem] items-center bg-white rounded-lg">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col justify-start space-y-2">
          <h6 className="text-[19px] font-semibold">Community</h6>
          <ul className="text-[#c0c0c0] text-[19px]">
            <li>
              <Link href={CWY_TWITTER_URL}>
                <a target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </Link>
            </li>
            <li>
              <Link href={CWY_DISCORD_URL}>
                <a target="_blank" rel="noreferrer">
                  Discord
                </a>
              </Link>
            </li>
            <li>
              <Link href={CWY_BLOG_URL}>
                <a target="_blank" rel="noreferrer">
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-start space-y-2">
          <h6 className="text-[19px] font-semibold">Development</h6>
          <ul className="text-[#c0c0c0] text-[19px]">
            <li>
              <Link href={CWY_DOCS_URL}>
                <a target="_blank" rel="noreferrer">
                  Docs
                </a>
              </Link>
            </li>
            <li>
              <Link href={CWY_AUDITS_URL}>
                <a target="_blank" rel="noreferrer">
                  Audits
                </a>
              </Link>
            </li>
            <li>
              <Link href={CWY_BUG_BOUNTY_URL}>
                <a target="_blank" rel="noreferrer">
                  Bug bounty
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-start space-y-2">
          <h6 className="text-[19px] font-semibold">Governance</h6>
          <ul className="text-[#c0c0c0] text-[19px]">
            <li>
              <Link href={CWY_FORUM_URL}>
                <a target="_blank" rel="noreferrer">
                  Forum
                </a>
              </Link>
            </li>
            <li>
              <Link href={CWY_SNAPSHOT_URL}>
                <a target="_blank" rel="noreferrer">
                  Snapshot
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
