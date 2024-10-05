import { refresh } from "./authService";

export const getText = async (): Promise<string> => {
  const res = await fetch(import.meta.env.VITE_API_HOST, {
    method: "GET",
    headers: {
      authorization: sessionStorage.accessToken,
    },
  });

  if (res.status === 401) {
    return refresh().then(() => getText());
  }

  return res.text();
};

export const saveText = async (value: string) => {
  fetch(import.meta.env.API_HOST, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: sessionStorage.accessToken,
    },
    body: JSON.stringify({
      value,
    }),
  });
};
