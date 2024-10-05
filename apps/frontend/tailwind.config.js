import sharedConfig from "@repo/ui/tailwind";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.tsx", "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
};

export default config;
