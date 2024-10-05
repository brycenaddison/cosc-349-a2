import { Button } from "@repo/ui";
import { useAuth } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const Header = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { email } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full border-b border-border justify-between items-center flex p-2">
        <div className="hidden sm:flex text-2xl font-bold">Online Notepad</div>
        <img className="block sm:hidden" src="/favicon.svg" />
        <div>
          <span className="hidden sm:inline">Signed in as </span>
          <span className="font-semibold mr-3">{email}</span>
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
      {children}
    </div>
  );
};
