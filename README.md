# Setup

For local development, ensure the environment variables have been properly configured in `apps/frontend` and `apps/api`. See each directory's README for more information.

Then, ensure you are using Node version 20 or greater and then enable `pnpm` if you have not done so already by running `corepack enable pnpm`.

From there, you can easily install dependencies for the entire monorepo by using `pnpm install` in the root directory.

If using a local testing database, you can run `docker-compose up -d pgadmin` to initialize and host a pre-configured database. Make sure the environment variables are properly configured in `apps/api` depending on what database solution you are using.

Then, running `pnpm run dev` will start the development servers for both the frontend and API. You can access the frontend at `http://localhost:5173/`.

# Deployment

We use containers to build the production software. To deploy the containers to the container registry, first ensure `DOCKER_REGISTRY` is set to the appropriate, locally authenticated container registry (i.e. `xxxxxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com`), then run `docker-compose build` and `docker-compose push`. An admin can then log into an EC2 instance, pull the containers from the repository, then run them with the appropriate environment variables to finish deploying.

# Architecture

The frontend is built with React and is compiled into a static page using `Vite`. This static page is hosted on a container using `nginx`. This page makes API calls to an Node.js backend using Express, running on another container. That container hosts private database credentials and is used to interface between the frontend and the database.

The frontend authenticates using OAuth provided by the Amazon Cognito service. The tokens are stored locally on the client and then used to authenticate to the backend to ensure that the notepad data stays private for each user.

The database is hosted with Amazon RDS and is running the Postgres engine, although other solutions like DynamoDB might be more practical and cost effective for a setup like this.

The containers are hosted on Amazon Elastic Container Registry, which can then be pulled and ran on an EC2 instance. Services like the Amazon Elastic Container Service can be used to orchestrate many more instances when used with an EC2 Load Balancer, but for this use case a single EC2 instance should be more than enough.