import Head from "next/head";
import { useState } from "react";
import Button from "~/components/Common/Button";
import ProgressBar from "~/components/Common/ProgressBar";
import Textarea from "~/components/Common/Textarea";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

import { api } from "~/utils/api";

export default function Home() {
    const [val, setVal] = useState(0);
    function increment() {
        setVal((p) => p + 1);
    }
    function decrement() {
        setVal((p) => p - 1);
    }

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
                <AuthoringLayout progress={1}>
                    <h1>Completing the Exercise 1</h1>

                    <p>
                        You can come back to the exercise later, and resume your
                        work. All your previous work will be waiting for you,
                        and you will be taken to the last point in the exercise
                        that you had completed.
                    </p>
                    <ProgressBar
                        className="place-self-end"
                        progress={val}
                        cap={17}
                    ></ProgressBar>
                    <Button
                        onClick={() => {
                            increment();
                        }}
                        className="place-self-end"
                        color="neutral"
                        fill="hollow"
                    >
                        Submit
                    </Button>
                </AuthoringLayout>
            </BaseLayout>
        </>
    );
}
