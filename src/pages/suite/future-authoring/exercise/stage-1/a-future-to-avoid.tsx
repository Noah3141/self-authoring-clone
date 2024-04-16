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
                <AuthoringLayout progress={24}>
                    <h1>
                        A Future to Avoid: Complete Summary
                        <span className="ps-6 text-neutral-200"></span>
                    </h1>

                    <p>
                        You have now written about the future you would like to
                        have. Clearly defining your future can help reduce the
                        uncertainty in your life, and reduce the amount of
                        negative emotion that you chronically experience, in
                        consequence. This is good for your confidence and for
                        your health. Having well-defined goals also increases
                        your chances of experiencing positive emotion, as people
                        experience most of their hope and joy and curiosity and
                        engagement as a consequence of pursuing valued goals
                        (and not, as people generally think, by attaining them).
                    </p>
                    <p>
                        It can also be very useful to deeply imagine the future
                        you would like to avoid. You probably know people who
                        have made very bad decisions, and who end up with a life
                        that nobody would want. You also likely have weaknesses
                        yourself. If you let those get out of control, then you
                        might also end up with a miserable, painful life. Most
                        people know how their life could go downhill if they let
                        it.
                    </p>
                    <p>
                        Spend some time, now, thinking about what your life
                        would be like if you failed to define or pursue your
                        goals, if you let your bad habits get out of control,
                        and if you ended up miserable, resentful and bitter.
                        Imagine your life three to five years down the road, if
                        you failed to stay on the path you know you should be
                        on. Use your imagination. Draw on your knowledge of the
                        anxiety and pain you have experienced in the past, when
                        you have betrayed yourself.
                    </p>
                    <p>
                        Think about the people you know who have made bad
                        decisions or remained indecisive, or who chronically
                        deceive themselves or other people, or who let cynicism
                        and anger dominate their lives. Where do you not want to
                        be?
                    </p>
                    <p>
                        {`Dream while you write, and don't stop. Write at least
                        until the 15 minutes have passed. Let yourself form a
                        very clear picture of the undesirable future.`}
                    </p>

                    {!!futureAuthoring ? (
                        <WorstFutureWizard
                            worstFuture={futureAuthoring.worstFuture}
                        />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/ideal-future-integration`}
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
                            href={`/suite/future-authoring/exercise/stage-1/ideal-future-summary`}
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

type WorstFutureWizardProps = {
    worstFuture: string;
};

const WorstFutureWizard: FC<WorstFutureWizardProps> = ({ worstFuture }) => {
    const apiState = api.useUtils();
    const [input, setInput] = useState(worstFuture);

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
                    worstFuture: input,
                });
            }}
            maxWords={900}
        />
    );
};
