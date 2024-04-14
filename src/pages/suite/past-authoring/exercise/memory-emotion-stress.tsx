import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function MemoryEmotionStress() {
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
                <AuthoringLayout progress={4}>
                    <h1>Memory, Emotion and Stress:</h1>
                    <p>
                        Your mind is always trying to determine the level of
                        danger presented by your environment. When bad things
                        happen to you, your mind and your body react by treating
                        the environment as if it is dangerous, and preparing for
                        emergency action. This preparation is stressful, and
                        depletes you, mentally and physically.
                    </p>
                    <p>
                        If something bad has happened to you, in the past, your
                        mind cannot be at peace until you have figured out how
                        to avoid having the same thing happen to you again in
                        the future. You can tell how well you have managed this
                        by remembering different important events from the past.
                        If you recall memories that make you feel ashamed, or
                        guilty, or angry, or hurt, and these memories are more
                        than a year and a half old, then your mind is not at
                        peace, and you are still carrying the weight of your
                        past.
                    </p>
                    <p>
                        Unresolved past issues make your mind and body react as
                        if the day-to-day environment that you inhabit is
                        permanently dangerous. Under such conditions, your body
                        reacts to stress with more preparation for action: for
                        fight or flight, which you may feel, respectively, as
                        anger or fear and emotional pain. If this preparation
                        becomes chronic, your mental and physical health can be
                        damaged. This happens in part because your body produces
                        more cortisol, a stress hormone, when you are
                        endangered. Cortisol makes you ready to act, but your
                        body gets the energy for such action by stealing from
                        your future reserves. Cortisol shuts down your higher
                        mental functions, inhibits your immune system, burns up
                        your available energy and, over time, damages the brain
                        areas responsible for memory and emotional control. Thus
                        it is very important to keep your stress levels within
                        reasonable boundaries.
                    </p>

                    <div className="mt-auto flex flex-row justify-between pt-6">
                        <Link
                            href={`/suite/past-authoring/exercise/intro-continued`}
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link href={`/suite/past-authoring/exercise/writing`}>
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
