import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import ProgressBar from "~/components/Common/ProgressBar";
import Sidebar from "~/components/Containers/Sidebar";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

export default function Sleeping() {
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
                <AuthoringLayout progress={8}>
                    <h1>Sleeping:</h1>
                    <p>
                        It may be best to do this exercise, as well as future
                        authoring exercises, over several days. The research
                        done on the relationship between writing and mental and
                        physical health has demonstrated that sleeping and, more
                        particularly, dreaming, can help you participate more
                        deeply in the writing exercise and consolidate your new
                        ideas.
                    </p>
                    <p>
                        So take your time and let yourself get deeply into the
                        exercise.
                    </p>
                    <div className="flex flex-row justify-between pt-6">
                        <Link href={`/suite/past-authoring/exercise/writing`}>
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/suite/past-authoring/exercise/attitude-while-writing`}
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
