import logo from "@/assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
const VerifyMali = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => navigate("/login");

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="w-20 mb-10">
        <img src={logo} className="w-full" alt="Japan job logo" />
      </div>
      <h1 className="text-lg mb-5 font-semibold">
        登録されたメールに承認リンクを送信しました。
        <br />
        ご確認の上、再度ログインしてください。
      </h1>
      <button
        className="mt-4  bg-primaryColor text-white px-4 py-2 rounded-md"
        onClick={handleBackToLogin}
      >
        ログインに戻る
      </button>
    </div>
  );
};

export default VerifyMali;
