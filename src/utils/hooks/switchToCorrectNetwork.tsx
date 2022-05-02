import toast from 'react-hot-toast'

import { networkMappings } from '../constants'

const useOtherNetworkHook = () => {
  const otherNetworkToast = (correctNetwork?: 1285 | 1313161554) => {
    toast.custom(
      (t) => (
        <div className="flex w-[300px] rounded-lg pointer-events-auto bg-white border-2 border-gray-100">
          <div className="w-full p-3">
            <div className="flex items-center justify-between"></div>
            <h6 className="text-opacity-50 text-[13px]">
              Please connect metamask{' '}
              {correctNetwork && `to ${networkMappings[correctNetwork]}`}
            </h6>
          </div>
        </div>
      ),
      {
        duration: 5000
      }
    )
  }
  return { otherNetworkToast }
}

export default useOtherNetworkHook
