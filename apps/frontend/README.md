# Setup

Before running, ensure that the environment variables have been set. Create a file called `env.local`, then fill in the following:
```ini
VITE_API_HOST="http://localhost:3001/"
```
For development on a local server, this should suffice, but can be changed if testing using a remote API.

Then, ensure you are using Node version 20 or greater and then enable `pnpm` if you have not done so already by running `corepack enable pnpm`.

From there, you can easily install dependencies with `pnpm install` and run the development server with `pnpm run dev`.