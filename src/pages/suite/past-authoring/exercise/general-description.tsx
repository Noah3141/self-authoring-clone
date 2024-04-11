import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function DescriptionPage() {
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
                <AuthoringLayout progress={12}>
                    <h1>General Description</h1>

                    <p>
                        {`First, you will be asked to divide your life into seven
                        different time periods or “epochs.” These epochs can be
                        as short or as long as you want, depending on how much
                        you want to write about. One epoch might be "Grade
                        School", for example, while a later epoch could be
                        "First Year University".`}
                    </p>
                    <p>
                        If you have many significant experiences from a
                        particular period of time, that period deserves to have
                        its own epoch.
                    </p>
                    <p>
                        Next, you will be asked to identify the significant
                        experiences that characterized each of the seven epochs.
                        You can write about as few or as many experiences as you
                        like for each epoch. Finally, you will be asked to
                        describe how each of these experiences has shaped who
                        you are today.
                    </p>
                    <p>
                        You can write as much as you want. People have written
                        thousands of words while completing this exercise. Other
                        people have written less.
                    </p>

                    <div className="flex flex-row justify-between">
                        <Link
                            href={`/suite/past-authoring/exercise/attitude-while-writing`}
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
                            href={`/suite/past-authoring/exercise/division-into-epochs`}
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
