import React from "react";
import BaseLayout from "~/layouts/Base";

const SignInRequired = () => {
    return (
        <BaseLayout>
            <div className="mx-auto w-full max-w-5xl pt-24 text-2xl">
                Please sign in to access Self Authoring suites
            </div>
        </BaseLayout>
    );
};

export default SignInRequired;
