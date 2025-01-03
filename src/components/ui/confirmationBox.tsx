import { jp } from "@/lang/jp";
import { MoonLoader } from "react-spinners";

interface ConfirmationBoxProps {
  message: string;
  onConfirm?: () => void | null;
  onCancel?: () => void | null;
  loading?: boolean;
  isSuccess?: boolean;
}

/**
 * This component is used to render a confirmation box with a message and optional confirm/cancel buttons.
 * @author PSK
 * @param message - The message to display in the confirmation box
 * @param onConfirm - Optional callback function when the confirm button is clicked
 * @param onCancel - Optional callback function when the cancel button is clicked
 * @param loading - Optional boolean to show a loading spinner
 * @param isSuccess - Optional boolean to show a success icon
 * @returns A styled ConfirmationBox component
 */
const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  message,
  onConfirm = null,
  onCancel = null,
  loading = false,
  isSuccess = false,
}) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full max-w-lg max-h-52 pt-10 pb-8 px-14 flex flex-col justify-between rounded-lg shadow-lg">
        <p className="text-lg mb-4 text-start">{message}</p>
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              {jp.cancel}
            </button>
          )}

          {onConfirm && (
            <button
              type="submit"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 flex items-center justify-center text-white rounded hover:bg-primaryColor/80"
              disabled={loading || isSuccess}
            >
              {isSuccess ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : loading ? (
                <MoonLoader size={20} color="black" />
              ) : (
                jp.confirm
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
