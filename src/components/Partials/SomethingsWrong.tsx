import React from "react";
import BaseLayout from "~/layouts/Base";
import Link from "../Common/Link";
import { useRouter } from "next/router";
import AuthoringLayout from "~/layouts/Authoring";

const SomethingsWrong = () => {
    const router = useRouter();

    return (
        <BaseLayout>
            <div className="mx-auto w-full max-w-5xl pt-24 text-2xl">
                Something's wrong!!
                <Link
                    onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                >
                    Go back
                </Link>
            </div>
        </BaseLayout>
    );
};

export default SomethingsWrong;
