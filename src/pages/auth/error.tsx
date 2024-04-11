import { signIn, SignInAuthorizationParams } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/Common/Button";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const ErrorPage = () => {
    const error = useRouter().query.error;

    return (
        <BaseLayout>
            <HomeLayout>
                <h1>Error!</h1>

                <p>{error}</p>
            </HomeLayout>
        </BaseLayout>
    );
};

export default ErrorPage;
