import Head from "next/head";
import { useState } from "react";
import Button from "~/components/Common/Button";
import ProgressBar from "~/components/Common/ProgressBar";
import Textarea from "~/components/Common/Textarea";

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
            <main className="p-12">
                <div className="flex flex-col items-center gap-3">
                    <Textarea maxWords={3000} minLength={5} />
                    <Button
                        onClick={() => {
                            increment();
                        }}
                        className="self-end"
                        color="primary"
                        fill="splash"
                    >
                        Submit
                    </Button>
                </div>
                <ProgressBar progress={val} cap={17}></ProgressBar>
            </main>
        </>
    );
}
