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
                <AuthoringLayout progress={11}>
                    <h1>
                        Your Family Life in the Future
                        <span className="ps-6 text-neutral-200">1.6</span>
                    </h1>
                    <p>
                        Take a moment to consider your home and family life.
                        Peaceful, harmonious family life provides people with a
                        sense of belonging, support for their ambitions, and
                        reciprocal purpose. Describe what your ideal family
                        would be like. You can write about your parents and
                        siblings, or about your plans for your own partner, or
                        about your children, if any – or about all of these.
                        What kind of partner would be good for you? How could
                        you improve your relationship with your parents or
                        siblings?
                    </p>
                    <p>
                        Think and write for at least two minutes, then move on.
                    </p>

                    {!!futureAuthoring ? (
                        <FamilyLifeWizard
                            familyLife={futureAuthoring.familyLife}
                        />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/your-leisure-life`}
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
                            href={`/suite/future-authoring/exercise/stage-1/your-career`}
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

type FamilyLifeWizardProps = {
    familyLife: string;
};

const FamilyLifeWizard: FC<FamilyLifeWizardProps> = ({ familyLife }) => {
    const apiState = api.useUtils();
    const [input, setInput] = useState(familyLife);

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
                    familyLife: input,
                });
            }}
            maxWords={300}
        />
    );
};
