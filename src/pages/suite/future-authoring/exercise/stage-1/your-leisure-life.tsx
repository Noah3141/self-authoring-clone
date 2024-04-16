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
                <AuthoringLayout progress={9}>
                    <h1>
                        Your Leisure Activity in the Future
                        <span className="ps-6 text-neutral-200">1.5</span>
                    </h1>

                    <p>
                        Take a moment to consider the activities you would like
                        to pursue outside of obligations such as work, family
                        and school. The activities you choose should be
                        worthwhile and personally meaningful.
                    </p>
                    <p>
                        Without a plan, people often default to whatever is
                        easiest, such as television watching, and waste their
                        private time. If you waste 4 hours a day, which is not
                        uncommon, then you are wasting 1400 hours a year. That
                        is equivalent to 35 40-hour work weeks, which is almost
                        as much as the typical individual spends at his or her
                        job every year.
                    </p>
                    <p>
                        If your time is worth $25 per hour, then you are wasting
                        time worth $35,000 per year. Over a 50-year period, that
                        is $1.8 million dollars, not counting interest or any
                        increase in the value of your time as you develop.
                    </p>
                    <p>
                        Describe what your leisure life would be like, if it was
                        set up to be genuinely productive and enjoyable.
                    </p>
                    <p>
                        Think and write for at least two minutes, then move on.
                    </p>

                    {!!futureAuthoring ? (
                        <ThingsToLearnAboutWizard
                            leisureLife={futureAuthoring.leisureLife}
                        />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/your-social-life`}
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
                            href={`/suite/future-authoring/exercise/stage-1/your-family-life`}
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

type ThingsToLearnAboutWizardProps = {
    leisureLife: string;
};

const ThingsToLearnAboutWizard: FC<ThingsToLearnAboutWizardProps> = ({
    leisureLife,
}) => {
    const apiState = api.useUtils();
    const [input, setInput] = useState(leisureLife);

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
                    leisureLife: input,
                });
            }}
            maxWords={300}
        />
    );
};
