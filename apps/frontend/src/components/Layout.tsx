import { Button, Toaster } from "@repo/ui";
import { useAuth } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/** Wraps pages of the app with nav bar, query provider, and toaster. */
export const Layout = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { email } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex flex-col">
        <div className="w-full border-b border-border justify-between items-center flex p-2">
          <div className="hidden sm:flex text-2xl font-bold">
            Online Notepad
          </div>
          <img className="block sm:hidden" src="/favicon.svg" />
          <div className="flex justify-end items-center">
            <div className="px-2">
              <span className="hidden sm:inline">Signed in as </span>
              <span className="font-semibold">{email}</span>
            </div>
            <Button onClick={handleLogout}>Log Out</Button>
          </div>
        </div>
        {children}
        <Toaster richColors />
      </div>
    </QueryClientProvider>
  );
};
