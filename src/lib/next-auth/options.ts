import CredentialsProvider from "next-auth/providers/credentials"
import { firebaseAdmin } from "../firebase/server";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials: any): Promise<any> {
                const { idToken } = credentials;

                if (!idToken) {
                    return null
                }

                try {
                    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken)

                    return {
                        uid: decodedToken.uid,
                        name: decodedToken.name,
                        email: decodedToken.email,
                        photoURL: decodedToken.picture
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.uid = user.uid
                token.name = user.name,
                token.email = user.email
                token.photoURL = user.photoURL
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {

            session.user.uid = token.uid
            session.name = token.name,
            session.user.email = token.email
            session.user.photoURL = token.photoURL
            return session
        }
    }
}