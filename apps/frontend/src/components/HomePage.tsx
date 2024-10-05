import { useEffect, useState } from "react";
import { Notepad } from "./Notepad";
import { getText } from "../services/dataService";

/*eslint-disable*/
function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const HomePage = () => {
  const [initialText, setInitialText] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(import.meta.env.VITE_API_HOST);
    getText().then(setInitialText);
  }, [setInitialText]);

  // var idToken = parseJwt(sessionStorage.idToken.toString());
  var accessToken = parseJwt(sessionStorage.accessToken.toString());
  console.log(accessToken);
  // console.log(
  //   "Amazon Cognito ID token encoded: " + sessionStorage.idToken.toString()
  // );
  // console.log("Amazon Cognito ID token decoded: ");
  // console.log(idToken);
  // console.log(
  //   "Amazon Cognito access token encoded: " +
  //     sessionStorage.accessToken.toString()
  // );
  // console.log("Amazon Cognito access token decoded: ");
  // console.log(accessToken);
  // console.log("Amazon Cognito refresh token: ");
  // console.log(sessionStorage.refreshToken);
  // console.log(
  //   "Amazon Cognito example application. Not for use in production applications."
  // );

  /*eslint-enable*/

  if (!initialText) {
    return (
      <div className="w-full h-full cursor-wait animate-pulse bg-foreground/5" />
    );
  }

  return (
    <Notepad
      value={initialText}
      onSave={(text) => console.log(`saved ${text}`)}
    />
  );
};

export default HomePage;
