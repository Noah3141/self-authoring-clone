import { signIn, SignInAuthorizationParams } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/Common/Button";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const ErrorPage = () => {
    const error = useRouter().query.error;
    console.error(error);

    return (
        <BaseLayout>
            <HomeLayout>
                <h1>Uh oh, an error occured!</h1>
                <p>Please try signing out, and signing in again.</p>
            </HomeLayout>
        </BaseLayout>
    );
};

export default ErrorPage;
