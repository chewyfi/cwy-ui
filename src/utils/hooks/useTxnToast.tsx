import toast from 'react-hot-toast'
import { CloseIcon } from 'src/components/icons/CloseIcon'

const useTxnToast = () => {
  const txnToast = (text: string, explorerUri: string) => {
    toast.custom(
      (t) => (
        <div className="flex w-[300px] rounded-lg pointer-events-auto bg-white border-2 border-gray-100">
          <div className="w-full p-3">
            <div className="flex items-center justify-between">
              <h6 className="text-[12px] font-bold uppercase">Transaction</h6>
              <button
                className="p-1 rounded hover:bg-gray-100 focus:outline-none"
                onClick={() => toast.dismiss(t.id)}
              >
                <CloseIcon />
              </button>
            </div>
            <h6 className="text-opacity-50 text-[13px]">{text}</h6>
            <div className="mt-1">
              <a
                href={explorerUri}
                target="_blank"
                className="text-[#eb4e6a] text-xs"
                rel="noreferrer"
              >
                View on Moonscan
              </a>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000
      }
    )
  }
  return { txnToast }
}

export default useTxnToast
