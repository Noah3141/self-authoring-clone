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
                <AuthoringLayout progress={17}>
                    <h1>
                        The Ideal Future: Complete Summary
                        <span className="ps-6 text-neutral-200">1</span>
                    </h1>
                    <p>
                        Now you have written briefly about your future, and have
                        had some time to consider more specific issues. This
                        step gives you the chance to integrate all the things
                        that you have just thought and wrote about.
                    </p>
                    <p>
                        Close your eyes. Daydream, if you can, and imagine your
                        ideal future:
                    </p>
                    <ul className="list-disc ps-6">
                        <li>Who do you want to be? What do you want to do?</li>
                        <li>Where do you want to end up?</li>
                        <li>Why do you want these things?</li>
                        <li>How do you plan to achieve your goals?</li>
                        <li>When will you put your plans into action?</li>
                    </ul>
                    <p>
                        {`Write about the ideal future that you have just imagined
                        for 15 minutes. Write continuously and try not to stop
                        while you are writing. Don't worry about spelling or
                        grammar. You will have an opportunity to fix your
                        mistakes later.`}
                    </p>
                    <p>
                        {`Dream while you write, and don't stop. Write at least
                        until the 15 minutes have passed. Be ambitious. Imagine
                        a life that you would regard as honourable, exciting,
                        productive, creative and decent.`}
                    </p>
                    <p>
                        {`Remember, you are writing only for yourself. Choose
                        goals that you want to pursue for your own private
                        reasons, not because someone else thinks that those
                        goals are important. You don't want to live someone
                        else's life. Include your deepest thoughts and feelings
                        about all your personal goals.`}
                    </p>

                    {!!futureAuthoring ? (
                        <IdealFutureWizard
                            idealFuture={futureAuthoring.idealFuture}
                        />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/qualities-you-admire`}
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
                            href={`/suite/future-authoring/exercise/stage-1/a-future-to-avoid`}
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

type IdealFutureWizardProps = {
    idealFuture: string;
};

const IdealFutureWizard: FC<IdealFutureWizardProps> = ({ idealFuture }) => {
    const apiState = api.useUtils();
    const [input, setInput] = useState(idealFuture);

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
            className="!min-h-[500px]"
            value={input}
            setValue={setInput}
            status={status}
            onFinishedTyping={() => {
                update({
                    idealFuture: input,
                });
            }}
            maxWords={1200}
        />
    );
};
