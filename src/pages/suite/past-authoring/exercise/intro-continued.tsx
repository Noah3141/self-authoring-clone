import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function IntroContinued() {
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
                <AuthoringLayout progress={2}>
                    <h1>Completing the Exercise 2</h1>

                    <p>
                        Text boxes also have a minimum and maximum required
                        lengths. You will not be able to proceed to the Next or
                        Previous page when you go have not provided the required
                        amount. To resolve this, edit your text until the number
                        of characters is within the range. These limitations
                        have been established to help you know how much to write
                        so that you do not get stalled at any point in the
                        process.
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
                        already completed.
                    </p>
                    <p>
                        After you have completed the exercise, you will be taken
                        to a Summary page. You can use that page to email
                        yourself a copy of your writing.
                    </p>
                    <p>
                        Before proceeding with the writing, you will be asked to
                        read about:
                    </p>
                    <ol>
                        <li>1) memory, emotion and stress </li>
                        <li>
                            {" "}
                            2) the benefits of writing (and of sleeping in
                            between writing sessions)
                        </li>
                        <li>
                            3) adopting the correct attitude for beneficial
                            writing
                        </li>
                    </ol>
                    <div className="flex flex-row justify-between pt-6">
                        <Link href={`/suite/past-authoring/exercise/intro`}>
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/suite/past-authoring/exercise/memory-emotion-stress`}
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
