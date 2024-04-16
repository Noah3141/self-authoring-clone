import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function FutureAuthoringIntro3() {
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
                    <h1>GENERAL INSTRUCTIONS 3</h1>
                    <p>
                        On many pages, you will not be able to successfully
                        click Next or Previous unless you have provided a
                        minimum of necessary text. If you do not, you will
                        receive an error message, and the text box in question
                        will be highlighted in red.
                    </p>

                    <p>
                        We do encourage you to write in some detail, however,
                        subject to those limitations. Our research indicates
                        that better results are obtained as the amount written
                        by participants increases.
                    </p>
                    <p>
                        There is a progress bar in the top right portion of the
                        screen, which displays the percentage of the exercise
                        that you have already completed. If you hover over the
                        bar with the mouse, you can see approximately how much
                        time it will still take to complete the exercise.
                    </p>
                    <p>
                        You may use the Index to jump to any page you have
                        already completed. Clicking the [Index] link will open
                        the index. Clicking it again will close it. Remember to
                        click Save to save any work on the current page before
                        using the index to jump to another page.
                    </p>
                    <p>
                        After you have completed the exercise, you will be taken
                        to a Summary page. You can use that page to email
                        yourself a copy of your writing.
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/intro-2`}
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
                            href={`/suite/future-authoring/exercise/stage-1/the-ideal-future`}
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
