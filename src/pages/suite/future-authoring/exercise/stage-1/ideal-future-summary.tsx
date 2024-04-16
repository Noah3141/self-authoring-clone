import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

export default function TheIdealFuture() {
    const { data: futureAuthoring, status: futureAuthoringStatus } =
        api.get.futureAuthoring.stage1.all.useQuery();

    if (futureAuthoringStatus === "error") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={2}>
                    <SomethingsWrong />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

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
                <AuthoringLayout progress={30}>
                    <h1>
                        Stage 1: The Ideal Future: Preliminary Notes and
                        Thoughts has been completed
                        <span className="ps-6 text-neutral-200"></span>
                    </h1>
                    <p>
                        Congratulations! You have now realized a vision of your
                        ideal future, and outlined a future that is best
                        avoided. You can use the summary of this vision to help
                        you complete Stage 2 of the Ideal Future planning
                        process.
                    </p>
                    <p>
                        {`Clicking the "Print Friendly Report" link will open an
                        additional window with a printer friendly version of
                        this report. You can either leave this new window open
                        or print it out.`}
                    </p>
                    <p>This summary will help you with the next stages.</p>

                    {!!futureAuthoring ? (
                        <section className="flex flex-col gap-6 rounded-lg border border-neutral-300">
                            <div className="flex flex-col gap-1">
                                <h2>One Thing You Could Do Better</h2>
                                <p>
                                    {futureAuthoring.oneThingYouCouldDoBetter}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>Things to Learn About</h2>
                                <p>{futureAuthoring.thingsToLearnAbout}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>Improve Your Habits</h2>
                                <p>{futureAuthoring.improveYourHabits}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>Your Social Life in the Future</h2>
                                <p>{futureAuthoring.socialLife}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>Your Leisure Activity in the Future</h2>
                                <p>{futureAuthoring.leisureLife}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>Your Family Life in the Future</h2>
                                <p>{futureAuthoring.familyLife}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>Your Career in the Future</h2>
                                <p>{futureAuthoring.careerLife}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>Qualities You Admire</h2>
                                <p>{futureAuthoring.qualitiesYouAdmire}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>The Ideal Future</h2>
                                <p>{futureAuthoring.idealFuture}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2>A Future to Avoid</h2>
                                <p>{futureAuthoring.worstFuture}</p>
                            </div>
                        </section>
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/a-future-to-avoid`}
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
                            href={`/suite/future-authoring/exercise/stage-2/intro`}
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
