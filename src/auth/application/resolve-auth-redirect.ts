const SIGN_IN_PATH = "/signin";

export function resolveAuthRedirect(input: {
  pathname: string;
  isAuthenticated: boolean;
}): string | null {
  const isSignIn = input.pathname === SIGN_IN_PATH;
  if (!input.isAuthenticated && !isSignIn) return SIGN_IN_PATH;
  if (input.isAuthenticated && isSignIn) return "/now-playing";
  return null;
}
