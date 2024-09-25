import illustration from "@/assets/fix/auth.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
type Props = {
  register?: boolean;
  logIn?: boolean;
  title: string;
  description: string;
};

const RedirectComponent = ({
  title,
  register = false,
  logIn = false,
  description,
}: Props) => {
  const navigate = useNavigate();
  const route = logIn ? "/login" : register ? "/register" : "";
  return (
    <div className="w-full h-full px-20 flex flex-col justify-center items-center bg-authbg text-white gap-10">
      <div className="w-50">
        <img src={illustration} className="w-full" alt="Japan job logo" />
      </div>
      <h1 className="main-title">{title}</h1>
      <p className="small">{description}</p>
      <Button
        onClick={() => {
          navigate(route);
        }}
        className="bg-white text-black w-60 font-semibold"
      >
        {logIn ? "Login Here" : register ? "Register Here" : ""}
      </Button>
    </div>
  );
};

export default RedirectComponent;
