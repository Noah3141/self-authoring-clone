import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
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
                <AuthoringLayout progress={13}>
                    <h1>
                        Your Career in the Future
                        <span className="ps-6 text-neutral-200">1.7</span>
                    </h1>

                    <p>
                        Much of what people find engaging in life is related to
                        their careers. A good career provides security, status,
                        interest, and the possibility of contributing to the
                        community. Take a moment to consider your school or work
                        careers, or both. Where do you want to be in six months?
                        Two years? Five years? Why? What are you trying to
                        accomplish?
                    </p>
                    <p>
                        Think and write for at least two minutes, then move on.
                    </p>

                    {!!futureAuthoring ? (
                        <CareerLifeWizard
                            careerLife={futureAuthoring.careerLife}
                        />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-1/your-family-life`}
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
                            href={`/suite/future-authoring/exercise/stage-1/qualities-you-admire`}
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

type CareerLifeWizardProps = {
    careerLife: string;
};

const CareerLifeWizard: FC<CareerLifeWizardProps> = ({ careerLife }) => {
    const apiState = api.useUtils();
    const [input, setInput] = useState(careerLife);

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
                    careerLife: input,
                });
            }}
            maxWords={300}
        />
    );
};
