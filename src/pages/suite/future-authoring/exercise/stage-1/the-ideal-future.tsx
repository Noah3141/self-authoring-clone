import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function TheIdealFuture() {
    return (
        <>
            <Head>
                <title>Future Authoring</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={0}>
                    <h1>The Ideal Future: Preliminary Notes and Thoughts</h1>

                    <p>
                        {`In this exercise you will begin to create a version, in
                        writing, of your ideal future. William James, the great
                        American psychologist, once remarked that he did not
                        know what he thought until he had written his thoughts
                        down. When he didn't know what to write, he wrote about
                        anything that came to mind. Eventually, his ideas became
                        focused and clarified.`}
                    </p>
                    <p>
                        {`Brainstorm. Write whatever comes to mind. Don't worry
                        too much about sentence construction, spelling, or
                        grammar. There will be plenty of time to write polished
                        sentences later. Avoid criticizing what you write.
                        Premature criticism interferes with the creative
                        process.`}
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/intro-3`}
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/imagining-your-ideal-future`}
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Next
                            </Button>
                        </Link>
                    </div>
                </AuthoringLayout>
            </BaseLayout>
        </>
    );
}
