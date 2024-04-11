import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import ProgressBar from "~/components/Common/ProgressBar";
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
                <AuthoringLayout>
                    <h1>Completing the Exercise 2</h1>

                    <div className="flex flex-row justify-between">
                        <Link href={`/past-authoring/exercise/sleeping`}>
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/past-authoring/exercise/general-description`}
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
