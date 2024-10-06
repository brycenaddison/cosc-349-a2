import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../services/authService";
import { Button, Input } from "@repo/ui";

/** Simple login and create account page. */
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const session = await signIn(email, password);

      if (session && typeof session.AccessToken !== "undefined") {
        sessionStorage.setItem("accessToken", session.AccessToken);

        if (sessionStorage.getItem("accessToken")) {
          window.location.href = "/";
        } else {
          console.error("Session token was not set properly.");
        }
      } else {
        console.error("SignIn session or AccessToken is undefined.");
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await signUp(email, password);
      navigate("/confirm", { state: { email } });
    } catch (error) {
      alert(`Sign up failed: ${error}`);
    }
  };

  return (
    <div className="flex h-screen mx-auto max-w-xl">
      <div className="flex flex-col my-auto gap-4 w-full">
        <h1 className="text-2xl font-bold">Online Notepad</h1>
        <h4>
          {isSignUp
            ? "Sign up to create an account."
            : "Sign in to your account."}
        </h4>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <div className="flex flex-col gap-4">
            <Input
              className="InputText"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <Input
              className="InputText"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {isSignUp && (
              <Input
                className="InputText"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            )}
            <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
          </div>
        </form>
        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Need an account? Sign Up"}
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
