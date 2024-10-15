import React from "react";
import { jp } from "@/lang/jp";
import { MoonLoader } from "react-spinners";

interface ConfirmationBoxProps {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  message,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white pt-10 pb-8 px-14 space-y-8 rounded-lg shadow-lg">
        <p className="text-lg mb-4 text-start">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            {jp.cancel}
          </button>
          <button
            type="submit"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 flex items-center justify-center text-white rounded hover:bg-primaryColor/80"
          >
            {loading ? <MoonLoader size={20} color="black" /> : jp.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
