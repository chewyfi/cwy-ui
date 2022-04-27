import { Disclosure } from '@headlessui/react'
import React from 'react'
import Footer from 'src/components/shared/Footer'
import Layout from 'src/components/shared/Layout'

const presale = () => {
  return (
    <Layout headerTitle="Presale" hideFooter>
      <div className="py-10">
        <span className="text-[17px] text-[#cfcfcf]">
          Connect to Fantom Network to participate in $CWY Presale
        </span>
        <div className="mt-5">
          <span className="text-[20px] font-medium">Terms</span>
          <div className="px-4 py-3 bg-[#f7f7f7] text-[16px] mt-3 space-y-2 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-[#cfcfcf]">Price</span>
              <span className="text-[#cfcfcf]">1 USDC : 1 CWY</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#cfcfcf]">For sale</span>
              <span className="text-[#cfcfcf]">1,000,000 CWY</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#cfcfcf]">Vesting</span>
              <span className="text-[#cfcfcf]">No Vesting</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#cfcfcf]">
                Max contributions per address
              </span>
              <span className="text-[#cfcfcf]">50,000 USDC</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <span className="text-[20px] font-medium">Deposit</span>
          <div className="px-4 py-3 bg-[#f7f7f7] text-[16px] mt-3 space-y-2 rounded-lg">
            <div className="flex">
              <div className="w-full">
                <label className="mb-1 text-[#cfcfcf] text-[14px]">
                  Balance: 0.00 USDC
                </label>
                <div className="flex items-center text-[14px]">
                  <input
                    placeholder={'0.00'}
                    type="number"
                    className="w-full px-2 py-1 font-semibold border-2 border-r-0 border-gray-200 rounded-l-lg outline-none"
                  />

                  <button className="px-2 py-1 font-semibold bg-white border-2 border-l-0 border-gray-200 rounded-r-lg focus:outline-none">
                    max
                  </button>
                </div>
                <button className="inline-block w-full p-1 mt-1 text-center text-white bg-black border-2 border-black rounded-lg">
                  Approve
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-[#cfcfcf]">Your contribution</span>
              <span className="text-[#cfcfcf]">0.00 USDC (0.00CWY)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#cfcfcf]">Total raised</span>
              <span className="text-[#cfcfcf]">0 USDC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#cfcfcf]">Left for sale</span>
              <span className="text-[#cfcfcf]">1,000,000 CWY</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <span className="text-[20px] font-medium">FAQ</span>
          <div className="text-[#cfcfcf]">
            <Disclosure as="div">
              <Disclosure.Button className="flex justify-between w-full px-4 py-6 bg-[#f7f7f7] text-[16px] mt-3 space-y-2 rounded-lg">
                <span>Tokenomics</span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                Visit https://docs.cwy.money
              </Disclosure.Panel>
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              <Disclosure.Button className="flex justify-between w-full px-4 py-6 bg-[#f7f7f7] text-[16px] mt-3 space-y-2 rounded-lg">
                <span>Goal of raising funds</span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                Visit https://docs.cwy.money
              </Disclosure.Panel>
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              <Disclosure.Button className="flex justify-between w-full px-4 py-6 bg-[#f7f7f7] text-[16px] mt-3 space-y-2 rounded-lg">
                <span>Roadmap</span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                Visit https://docs.cwy.money
              </Disclosure.Panel>
            </Disclosure>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  )
}

export default presale
