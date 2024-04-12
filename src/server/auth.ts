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
            // ...other properties
            // role: UserRole;
        };
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
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
        session: ({ session, user, token }) => {
            if (session.user) {
                session.user.id = token.sub!;
            }

            return session;
        },
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
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
                console.log(credentials);

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
        // DiscordProvider({
        //   clientId: env.DISCORD_CLIENT_ID,
        //   clientSecret: env.DISCORD_CLIENT_SECRET,
        // }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
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
