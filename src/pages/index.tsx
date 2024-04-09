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
                <h1></h1>
                <ProgressBar
                    className="place-self-end"
                    progress={val}
                    cap={17}
                ></ProgressBar>
                <Textarea maxWords={3000} minLength={5} />
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
            </BaseLayout>
        </>
    );
}
