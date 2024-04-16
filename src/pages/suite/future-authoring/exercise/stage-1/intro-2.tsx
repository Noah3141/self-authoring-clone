import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function FutureAuthoringIntro2() {
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
                    <h1>GENERAL INSTRUCTIONS 2</h1>

                    <p>
                        During this exercise, you will be presented with a
                        series of pages either providing you with information,
                        or asking you to describe aspects of your personality
                        and experiences.
                    </p>
                    <p>
                        You may proceed through the exercise by clicking the
                        Next button.
                    </p>
                    <p>
                        You can go back to previous pages by clicking Previous.
                    </p>
                    <p>
                        Each time you click Next or Previous, the data you have
                        entered on that page will be saved. You can also save
                        your data while remaining on the same page by clicking
                        Save. In addition, many of the pages where you are asked
                        to write for longer periods of time will automatically
                        save every minute or so.
                    </p>
                    <p>
                        You may quit the exercise any time by clicking Exit/Home
                        or shutting down your browser. If the current page is a
                        page you have been writing on, remember to click Save
                        before exiting. The text that you entered on previous
                        pages will have already been saved.
                    </p>
                    <p>
                        You can come back to the exercise later, and resume your
                        work. All your previous work will be waiting for you,
                        and you will be taken to the last point in the exercise
                        you had completed.
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/intro`}
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
                            href={`/suite/future-authoring/exercise/stage-1/intro-3`}
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
