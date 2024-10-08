import { refresh } from "./authService";

const getApi = (): string => `http://${window.location.hostname}:3001/`;

/** Attempts to fetch text from backend of authenticated user. */
export const getText = async (): Promise<string> => {
  const res = await fetch(getApi(), {
    method: "GET",
    headers: {
      authorization: sessionStorage.accessToken,
    },
  });

  if (res.status === 401) {
    return refresh().then(() => getText());
  }

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.text();
};

/** Attempts to save text to backend of authenticated user. */
export const saveText = async (value: string): Promise<number> => {
  const res = await fetch(getApi(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: sessionStorage.accessToken,
    },
    body: JSON.stringify({ text: value }),
  });

  if (res.status === 401) {
    return refresh().then(() => saveText(value));
  }

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json().then(({ timestamp }: { timestamp: number }) => timestamp);
};
