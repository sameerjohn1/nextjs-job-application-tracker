import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
    let session = null;
    try {
        session = await auth.api.getSession({
            headers: request.headers
        });
    } catch (error) {
        console.error("Error fetching session in proxy:", error);
    }

    const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

    if (isDashboardPage && !session?.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
    const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

    if ((isSignInPage || isSignUpPage) && session?.user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};