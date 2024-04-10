import NextAuth, { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

export const config: NextAuthConfig = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png"
    },
    providers: [Github({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET })],
    basePath: "/api/auth",
    callbacks: {
        authorized({ request, auth }) {
            try {
                const { pathname } = request.nextUrl
                if (pathname === "/producted-page") return !!auth;

                return true
            } catch (e) {
                console.log(e)
            }
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            return session
        },
        async jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name;
            return token
        }
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)