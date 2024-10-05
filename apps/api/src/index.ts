import { jwtVerifier } from "./auth";
import { createServer } from "./server";

const port = process.env.PORT || 3001;
const server = createServer();

jwtVerifier
  .hydrate()
  .catch((err) => {
    console.error(`Failed to hydrate JWT verifier: ${err}`);
    process.exit(1);
  })
  .then(() =>
    server.listen(port, () => {
      console.log(`api running on ${port}`);
    })
  );
