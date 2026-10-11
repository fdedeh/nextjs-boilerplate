import { NextResponse } from "next/server";
import { auth } from "@/auth/data/auth";
import { resolveAuthRedirect } from "@/auth/application/resolve-auth-redirect";

// Next.js 16 proxy convention (replaces middleware). Deep-imports the Auth.js instance so the
// feature façade — which re-exports client components — stays out of this bundle.
export default auth((req) => {
  const target = resolveAuthRedirect({
    pathname: req.nextUrl.pathname,
    isAuthenticated: Boolean(req.auth),
  });
  if (target && target !== req.nextUrl.pathname) {
    return NextResponse.redirect(new URL(target, req.nextUrl.origin));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
