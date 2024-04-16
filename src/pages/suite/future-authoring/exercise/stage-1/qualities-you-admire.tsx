import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Textarea from "~/components/Common/Textarea";
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
                <AuthoringLayout progress={15}>
                    <h1>
                        Qualities You Admire
                        <span className="ps-6 text-neutral-200">1.8</span>
                    </h1>
                    <p>
                        People you automatically admire have qualities that you
                        would like to possess or imitate. Identifying those
                        qualities can help you determine who it is that you want
                        to be. Take a moment to think about the two or three
                        people you most admire. Who are they? Which qualities do
                        they possess that you wish you had?
                    </p>
                    <p>
                        Think and write for at least two minutes, then move on.
                    </p>

                    {!!futureAuthoring ? (
                        <QualitiesYouAdmireWizard
                            qualitiesYouAdmire={
                                futureAuthoring.qualitiesYouAdmire
                            }
                        />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/your-career`}
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
                            href={`/suite/future-authoring/exercise/stage-1/ideal-future-integration`}
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

type QualitiesYouAdmireWizardProps = {
    qualitiesYouAdmire: string;
};

const QualitiesYouAdmireWizard: FC<QualitiesYouAdmireWizardProps> = ({
    qualitiesYouAdmire,
}) => {
    const apiState = api.useUtils();
    const [input, setInput] = useState(qualitiesYouAdmire);

    const {
        mutate: update,
        status,
        reset,
    } = api.update.futureAuthoring.useMutation({
        onError: () => {
            void toast.error("Something went wrong saving your input!");
        },
        onSuccess: () => {
            void apiState.get.futureAuthoring.stage1.all.invalidate();
            setTimeout(() => {
                reset();
            }, 3000);
        },
    });

    return (
        <Textarea
            value={input}
            setValue={setInput}
            status={status}
            onFinishedTyping={() => {
                update({
                    qualitiesYouAdmire: input,
                });
            }}
            maxWords={300}
        />
    );
};
