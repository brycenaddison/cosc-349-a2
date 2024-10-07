import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";

const config = {
  region: import.meta.env.VITE_REGION,
  userPoolId: import.meta.env.VITE_USER_POOL_ID,
  clientId: import.meta.env.VITE_CLIENT_ID,
};

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

/**
 * Authenticates with username and password, storing tokens in session storage. */
export const signIn = (username: string, password: string) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  } satisfies InitiateAuthCommandInput;

  return authenticate(params);
};

/** Attempts to authenticate with the refresh token in storage. */
export const refresh = async () => {
  const params = {
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      REFRESH_TOKEN: sessionStorage.refreshToken,
    },
  } satisfies InitiateAuthCommandInput;

  return authenticate(params);
};

const authenticate = async (params: InitiateAuthCommandInput) => {
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      sessionStorage.setItem(
        "accessToken",
        AuthenticationResult.AccessToken || ""
      );
      sessionStorage.setItem(
        "refreshToken",
        AuthenticationResult.RefreshToken || ""
      );
      return AuthenticationResult;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

/** Signs up to Cognito user pool. */
export const signUp = async (email: string, password: string) => {
  const params = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log("Sign up success: ", response);
    return response;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

/** Sends email confirmation to Cognito. */
export const confirmSignUp = async (username: string, code: string) => {
  const params = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
};

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

/**
 * A hook returning the email in the ID token and the refresh token from
 * session storage.
 */
export const useAuth = (): {
  email: string;
  refreshToken: string;
} => {
  const idToken = parseJwt(sessionStorage.idToken.toString());

  return {
    email: idToken.email,
    refreshToken: sessionStorage.refreshToken,
  };
};
