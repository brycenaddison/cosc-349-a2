# Setup

Before running, ensure that the environment variables have been set. Create a file called `env.local`, then fill in the following variables.  Note that it is fine that AWS User Pool ID and Client ID are public information.
```ini
VITE_REGION=us-east-1
VITE_USER_POOL_ID=us-east-1_KvEgTmwzv
VITE_CLIENT_ID=lmubjg1u349bcc9ptbaa6v300
```

Then, ensure you are using Node version 20 or greater and then enable `pnpm` if you have not done so already by running `corepack enable pnpm`.

From there, you can easily install dependencies with `pnpm install` and run the development server with `pnpm run dev`, which will be hosted at `http://localhost:5173/`.