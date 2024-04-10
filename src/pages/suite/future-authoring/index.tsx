import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

const FutureAuthoringPage = () => {
    return (
        <>
            <Head>
                <title></title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout>
                    <h1>Future Authoring</h1>

                    <p>
                        Click Open Exercise below to get started with your Past
                        Authoring exercise. You may work on it for as long as
                        you wish and exit at any time. Remember to save the page
                        you are working on before exiting. When you are ready to
                        return to work, you'll find your exercise on your My
                        Work page whenever you are logged in. You can return to
                        your exercise as often as you wish. Your previously
                        completed work will be waiting for you.
                    </p>

                    <p>
                        You can delete all the text/information that you've
                        already entered for this exercise, by clicking here.
                    </p>

                    <Link href={`/suite/future-authoring/exercise/intro`}>
                        <Button
                            className="mx-auto !px-12"
                            color="primary"
                            fill="splash"
                        >
                            Open Exercise
                        </Button>
                    </Link>
                </AuthoringLayout>
            </BaseLayout>
        </>
    );
};

export default FutureAuthoringPage;
