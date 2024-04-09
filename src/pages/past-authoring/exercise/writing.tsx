import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import ProgressBar from "~/components/Common/ProgressBar";
import Sidebar from "~/components/Containers/Sidebar";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function Writing() {
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
                    <h1>Writing:</h1>
                    <p>
                        Why write? Writing is a sophisticated form of thinking.
                        Thinking prepares you to perceive properly and act
                        intelligently. If you {`don't`} think things through,
                        particularly difficult things, then you are likely to
                        make serious mistakes and to hurt yourself and other
                        people. When you write about personally important
                        matters, you can start to identify the causes of events
                        that might hurt and damage you. You can begin to
                        understand how you might have to change the way you see
                        and think to avoid unnecessary pain and suffering.
                    </p>
                    <p>
                        You have to mine the information that the past provides
                        to ensure that the present and future emerge positively
                        and productively.
                    </p>
                    <p>
                        It is best to do the writing that is associated with
                        this exercise by entering into a reverie. A reverie is a
                        state of contemplation, like a daydream. Normal focused
                        goal-oriented thought tends to be narrow, precise and
                        expressed in words. Image-laden thought - the movie that
                        runs in your head - is more dream- or story-like. To
                        complete this exercise properly, you have to daydream
                        about the past, and let thoughts and images come to you,
                        instead of controlling them. This can be frightening, if
                        you start to remember unpleasant events from the past.
                        However, it can be very useful to confront things that
                        you are afraid of, voluntarily, particularly if your
                        fears are stopping you from living properly in the
                        present and the future.
                    </p>
                    <p>
                        Voluntarily facing the remembered things you fear or
                        that you hate is the best way of dealing with them.
                        {` Don't`} rush this exercise, or the ones that follow,
                        if you decide to complete them, as well. They are not
                        something to merely complete. You have to take your
                        time. In a reverie, or a daydream, parts of your mind
                        that {`haven't`} been able to speak because of your
                        focused concentration or moral opinions have a chance to
                        let themselves be known. These are parts of you that
                        need a voice. If you take your time, then you can make
                        contact with parts of yourself that have been shut away.
                        You will need the abilities and energies that are
                        contained within these shut-away parts to deal with the
                        challenges of the present and the future.
                    </p>

                    <div className="flex flex-row justify-between">
                        <Link
                            href={`/past-authoring/exercise/memory-emotion-stress`}
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link href={`/past-authoring/exercise/sleeping`}>
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
