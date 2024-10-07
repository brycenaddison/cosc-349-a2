# Setup

Before running, ensure that the environment variables have been set. Create a file called `env.local`, then fill out each variable.
For local development, the following should suffice. Note that it is fine that AWS User Pool ID and Client ID are public information.
```ini
AWS_USER_POOL_ID="us-east-1_KvEgTmwzv"
AWS_CLIENT_ID="lmubjg1u349bcc9ptbaa6v300"
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="password"
DB_NAME="postgres"
```
If you want to connect to a remote database instead or use a different user pool, adjust the variables accordingly.

Then, ensure you are using Node version 20 or greater and then enable `pnpm` if you have not done so already by running `corepack enable pnpm`.

From there, you can easily install dependencies with `pnpm install` and run the development server with `pnpm run dev`, which will be hosted at `http://localhost:3001/`.