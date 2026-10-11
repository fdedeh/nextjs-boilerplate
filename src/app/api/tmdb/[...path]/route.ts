import "server-only";
import { NextResponse, type NextRequest } from "next/server";

const UPSTREAM = "https://api.themoviedb.org";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function forward(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { status_code: 500, status_message: "TMDB read access token is not configured." },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const incoming = new URL(request.url);
  const target = new URL(`${UPSTREAM}/${path.join("/")}`);
  target.search = incoming.search;

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept", "application/json");

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    cache: "no-store",
  });

  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export function GET(request: NextRequest, context: RouteContext) {
  return forward(request, context);
}

export function HEAD(request: NextRequest, context: RouteContext) {
  return forward(request, context);
}
