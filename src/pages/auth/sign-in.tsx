import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

type Credentials = {
    email: string;
    password: string;
};

const SignInPage = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    });

    return (
        <BaseLayout>
            <HomeLayout>
                <h1>Log on</h1>

                <p>
                    Please enter your username and password. Click here if you
                    have forgotten your username or your password.
                </p>

                <form
                    className="flex flex-col justify-center gap-12 pt-16 "
                    action=""
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex w-full flex-col justify-between gap-1">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Email"
                                id="email"
                                value={credentials.email}
                                onChange={(e) => {
                                    setCredentials((p) => ({
                                        ...p,
                                        email: e.target.value,
                                    }));
                                }}
                                type="email"
                                className="w-96 rounded border border-neutral-400 p-1 autofill:bg-info-200 hover:cursor-pointer hover:bg-neutral-100 hover:autofill:bg-info-300 focus:cursor-text"
                            />
                        </div>
                        <div className="flex w-full flex-col justify-between gap-1">
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="Password"
                                value={credentials.password}
                                onChange={(e) => {
                                    setCredentials((p) => ({
                                        ...p,
                                        password: e.target.value,
                                    }));
                                }}
                                id="password"
                                type="password"
                                className="w-96 rounded border border-neutral-400 p-1 autofill:bg-info-200 hover:cursor-pointer hover:bg-neutral-100 hover:autofill:bg-info-300 focus:cursor-text"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={async (e) => {
                            e.preventDefault();
                            const res = await signIn("credentials", {
                                email: credentials.email,
                                password: credentials.password,
                                redirect: false,
                            });

                            if (res?.ok) {
                                await router.push("/");
                                toast.success("Signed in!");
                            } else {
                                toast.error(
                                    res?.error ?? "Something went wrong",
                                );
                            }
                        }}
                    >
                        Sign in
                    </Button>
                </form>
            </HomeLayout>
        </BaseLayout>
    );
};

export default SignInPage;
