import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function FutureAuthoringIntro() {
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
                    <h1>GENERAL INSTRUCTIONS 1</h1>
                    <p>
                        The full future authoring exercise has 2 different
                        stages, each with a number of steps.
                    </p>
                    <ul>
                        <li>
                            In Stage 1, you will write generally about your
                            goals.
                        </li>
                        <li>
                            In Stage 2, you will specify and clarify the nature
                            of those goals, and begin to strategize.
                        </li>
                    </ul>

                    <p>
                        We recommend that you complete the process over two or
                        more separate days. People who allow themselves some
                        time to sleep when they are making important decisions
                        appear to do a better job and to benefit more. The
                        entire exercise will require approximately two and a
                        half hours.
                    </p>
                    <p>
                        On the first day, you might want to complete Stage 1. On
                        the second day, you could complete Stage 2.
                    </p>
                    <p>
                        {`You will need to concentrate and process what you are
                        writing, so try to complete this exercise when you are
                        feeling alert and relatively unrushed. Simply follow the
                        on-screen instructions as you go along. Press the "Next"
                        button to move onto the next screen. If you need to take
                        a short break or two of 5-10 minutes to get up and walk
                        around during the process, please feel free to do so.`}
                    </p>
                    <p>
                        You will be asked to write down your private thoughts
                        and feelings. Please type them directly into the box
                        provided. At times, you may be asked to write non-stop,
                        without regard for grammar or spelling. At other times,
                        you may be asked to revise what you have written.
                    </p>
                    <p>
                        This exercise is meant to benefit YOU personally.
                        Everything you write will remain accessible only to you
                        and those you designate as recipients. The report you
                        produce will summarize your personal goals and
                        strategies. You and your recipients, if any, will be
                        emailed a copy of this report shortly after you complete
                        the exercise.
                    </p>
                    <p>
                        During some sections, you will be asked to write for
                        specified amounts of time. Please try your best to write
                        for the amount of time specified (so, if it asks you to
                        write for 1-2 minutes, please write continuously for at
                        least 60 seconds).
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link href={`/suite/future-authoring/`}>
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/intro-2`}
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
