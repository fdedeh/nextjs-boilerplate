import { err, ok, type Result } from "@/core/domain/base/result";
import { AuthError } from "./auth.error";
import type { TUser } from "./user.entity";

export type TCredentials = {
  username: string;
  password: string;
};

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin";

/**
 * Hardcoded credential check for the starter. New projects replace this function
 * with a real identity provider inside the Auth.js adapter.
 */
export function authenticate(credentials: TCredentials): Result<TUser, AuthError> {
  const username = credentials.username.trim();
  const password = credentials.password;
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    return ok({ username });
  }
  return err(new AuthError("INVALID_CREDENTIALS", "Invalid username or password."));
}
