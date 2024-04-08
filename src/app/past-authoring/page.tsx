import Head from "next/head";
import Link from "next/link";
import type { FC } from "react";
import Button from "~/components/Common/Button";

const PastAuthoringPage: FC = () => {
    return (
        <>
            <h1>Past Authoring</h1>

            <p>
                Click Open Exercise below to get started with your Past
                Authoring exercise. You may work on it for as long as you wish
                and exit at any time. Remember to save the page you are working
                on before exiting. When you are ready to return to work,{" "}
                {`you'll`} find your exercise on your My Work page whenever you
                are logged in. You can return to your exercise as often as you
                wish. Your previously completed work will be waiting for you.
            </p>

            <p>
                You can delete all the text/information that{` you've`}
                already entered for this exercise, by clicking here.
            </p>

            <Link href={`/past-authoring/exercise/intro`}>
                <Button
                    className="mx-auto !px-12"
                    color="primary"
                    fill="splash"
                >
                    Open Exercise
                </Button>
            </Link>
        </>
    );
};

export default PastAuthoringPage;
