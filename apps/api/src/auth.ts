import { CognitoJwtVerifier } from "aws-jwt-verify";
import { Request, Response, NextFunction } from "express";
import { JwtExpiredError } from "aws-jwt-verify/error";

// Create the verifier outside your route handlers,
// so the cache is persisted and can be shared amongst them.
export const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_USER_POOL_ID ?? "",
  tokenUse: "access",
  clientId: process.env.AWS_CLIENT_ID ?? "",
  scope: "aws.cognito.signin.user.admin",
});

export const cognito = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // A valid JWT is expected in the HTTP header "authorization"
    const payload = await jwtVerifier.verify(req.header("authorization") ?? "");

    res.locals.payload = payload;

    return next();
  } catch (err) {
    console.error(err);

    if (err instanceof JwtExpiredError) {
      return res
        .status(401)
        .json({ statusCode: 401, message: "Token expired" });
    }

    return res.status(403).json({ statusCode: 403, message: "Forbidden" });
  }
};
