import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const expectedUser = process.env.PREVIEW_USERNAME;
  const expectedPass = process.env.PREVIEW_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new NextResponse("Önizleme yapılandırılmamış.", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const [user, pass] = atob(auth.slice(6)).split(":");
    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Kimlik doğrulama gerekli.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Onizleme"' },
  });
}

export const config = {
  matcher: ["/onizleme", "/onizleme/:path*"],
};
