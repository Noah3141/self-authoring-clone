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
                <AuthoringLayout progress={2}>
                    <h1>Imagining Your Ideal Future</h1>

                    <p>
                        You will start with some exercises of imagination that
                        will help you warm up to the task of defining your
                        future.
                    </p>
                    <p>
                        {`These will include 8 questions such as "what could you
                        do better?", "what would you like to learn about?",
                        "what habits would you like to improve?". After briefly
                        answering these 8 questions, you will be asked to write
                        for 15 minutes about your ideal future, without editing
                        or criticism.`}
                    </p>
                    <p>
                        Let yourself daydream or fantasize. You are trying to
                        put yourself into a state of reverie, which is a form of
                        dream-like thinking that relies heavily on internal
                        imagery. This kind of thinking allows all your different
                        internal states of motivation and emotion to find their
                        voice.
                    </p>
                    <p>
                        It might be best to concentrate on your future three to
                        five years down the road, although you may have reasons
                        to concentrate on a shorter or longer timespan (eighteen
                        months to ten years).
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/the-ideal-future`}
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
                            href={`/suite/future-authoring/exercise/stage-1/one-thing-you-could-do-better`}
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
