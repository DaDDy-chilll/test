import React from "react";
import { jp } from "@/lang/jp";

interface ConfirmationBoxProps {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4 font-bold">{message}</p>
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
            className="px-4 py-2 bg-primaryColor  text-white rounded hover:bg-primaryColor/80"
          >
            {jp.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
