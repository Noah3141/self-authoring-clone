import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { db } from "~/server/db";
import type { User } from "@prisma/client";
import type { UserRole } from "~/types/enums";
import { DefaultJWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            id: string;
            role: string;
        };
    }

    interface User {
        role: string;
    }
}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user: {
            id: string;
            role: string;
        };
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/sign-in",
        signOut: "/",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                // user is undefined on useSession() calls, but defined on initial sign in,
                // So, we persist past the initial sign in by passing data in only if user is undefined
                // (this way it doesn't overwrite to undefined on subsequent calls)
                token.user = {
                    id: user.id,
                    role: user.role,
                };
            }

            return token;
        },
        session: ({ session, token }) => {
            if (session.user) {
                session.user.id = token.user.id;
                session.user.role = token.user.role;
            }

            return session;
        },
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials, req): Promise<User | null> {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const encryptedPassword = crypto
                    .createHash("sha256")
                    .update(credentials.password, "utf8")
                    .digest("base64");

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    throw new Error("No user found!");
                }

                if (user.password !== encryptedPassword) {
                    throw new Error("Invalid credentials!");
                }

                return user;
            },
        }),
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
