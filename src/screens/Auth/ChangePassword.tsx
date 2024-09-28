import React, { useState } from 'react';
import { jp } from "@/lang/jp";
import { useNavigate } from 'react-router-dom';
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import RouteName from "@/navigations/routes";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const successAlert = () => {
    return (
      Swal.fire({
        title: '成功',
        text: 'パスワードが正常に変更されました',
        icon: 'success',
        confirmButtonText: 'オーケー'
      })
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }
    // Add logic to handle password change
    setSuccess(true);
    successAlert();
    setTimeout(() => {
      navigate(RouteName.LOGIN);
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-12 text-center mt-3">{jp.resetPassword}</h2>
        <form className="space-y-8 w-full" onSubmit={handleSubmit}>
          <div>
            <Input
              name="newPassword"
              type="password"
              label={jp.newPassword}
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              className="mt-1 block w-full"
              required={false}
            />
          </div>
          <div>
            <Input
              name="confirmNewPassword"
              type="password"
              label={jp.confirmPassword}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 block w-full"
              required={false}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-col sm:flex-row justify-center gap-x-2 pb-2">
            <div className="sm:w-1/3 md:w-1/3 w-full">
              <Link to="/otp">
                <button className="mt-6 px-4 py-2 bg-gray-200 rounded w-full border">
                  {jp.back}
                </button>
              </Link>
            </div>
            <div className="sm:w-2/3 md:w-2/3 w-full">
              <Button className="mt-6 px-4 py-2 rounded w-full">
                {jp.changePassword}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
