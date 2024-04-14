import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function AttitudeWhileWritingPage() {
    return (
        <>
            <Head>
                <title>Attitude while writing</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={10}>
                    <h1>Attitude While Writing</h1>

                    <p>
                        If you are rushed, or distracted, or bored, then you are
                        not doing the writing in a manner that will benefit you.
                        If you are writing about important events, you may find
                        the exercise difficult and emotionally challenging, but
                        it should not be boring. If you are rushed or
                        distracted, then you are trying too hard to finish, or
                        have not put enough time aside to do the writing.
                    </p>
                    <p>
                        It is very important to negotiate with yourself properly
                        when trying to write about important things. Try to
                        think through the fact that spending some time dealing
                        with your past can benefit you in many ways. It can help
                        you escape from the ghosts of the past. It can lower
                        your level of stress. It can help you think more clearly
                        now and in the future. It can help you get to know who
                        you really are and how your life has affected you,
                        positively and negatively. It can help you become
                        healthier, mentally and physically. It can help you
                        enjoy your life in the present, eliminate your
                        resentment and misery, and prepare you to plan for the
                        future.
                    </p>
                    <p>
                        It is worth putting in the time to reap such benefits.
                    </p>
                    <p>
                        Many times when a person is writing, they are writing
                        for some other person or for some outside reason. If you
                        have done this writing exercise properly you will be
                        working primarily for yourself. What you produce should
                        be a deeply personal document.{" "}
                    </p>

                    <div className="mt-auto flex flex-row justify-between pt-6">
                        <Link href={`/suite/past-authoring/exercise/sleeping`}>
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/suite/past-authoring/exercise/general-description`}
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
