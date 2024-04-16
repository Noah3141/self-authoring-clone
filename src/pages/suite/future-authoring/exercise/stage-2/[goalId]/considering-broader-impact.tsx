import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { FC, useState } from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import { Goal } from "@prisma/client";
import { useRouter } from "next/router";
import Textarea from "~/components/Common/Textarea";
import toast from "react-hot-toast";

const ConsideringBroaderImpactPage: NextPage = () => {
    const router = useRouter();
    const goalId = router.query.goalId as string;

    const { data: goalData, status: goalsStatus } =
        api.get.futureAuthoring.stage2.byId.withAdjacent.useQuery({ goalId });

    if (goalsStatus === "error") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <SomethingsWrong />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    if (goalsStatus === "pending") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <LoadingSpinner />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    const { goal } = goalData;

    return (
        <>
            <Head>
                <title>Considering Impact</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <h1>
                        {goal.title}
                        <span className="ps-6 text-neutral-200">
                            2.{goal.priority}.2
                        </span>
                    </h1>
                    <h2>
                        Considering the Broad Personal and Social Impact of
                        Goals
                    </h2>

                    <p>
                        Goals can have an impact beyond the obvious. Our
                        specific personal goals are connected to larger, more
                        important life goals. These higher-order goals reflect
                        our most important ideals. The specific goal of spending
                        more time studying or reading, for example, is a
                        specific element of the more important goal of being a
                        well-educated person. Achieving other specific goals,
                        such as becoming more assertive, help us to move closer
                        to our ideal self.
                    </p>

                    <p>
                        You will now be asked to write about what more globally
                        important things might be affected by your attainment of
                        the goal listed below:
                    </p>

                    <ul className="list-disc ps-6">
                        <li>
                            How would disciplined success change the way that
                            you see yourself?
                        </li>
                        <li>
                            How would other parts of your personal life change,
                            in consequence?
                        </li>
                        <li>
                            How would this affect the way that others perceive
                            you? (You might also consider fears of being
                            successful. Sometimes people are afraid to succeed
                            because of the responsibility this would entail.
                            Sometimes they are afraid of even becoming conscious
                            of their true goals, because then they would be
                            aware when they fail. These are not good
                            strategies.)
                        </li>
                        <li>
                            How would attaining this goal affect the lives of
                            the people around you?
                        </li>
                        <li>
                            What broader beneficial social impact might your
                            success have?
                        </li>
                    </ul>

                    <p>
                        Please write a short description of how attaining this
                        goal would change additional important aspects of your
                        life, and the lives of others.
                    </p>

                    <ConsideringBroaderImpactWizard goal={goal} />

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/${goalId}/evaluating-your-motives`}
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
                            href={`/suite/future-authoring/exercise/stage-2/${goalId}/considering-detailed-strategies`}
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
};

export default ConsideringBroaderImpactPage;

type ConsideringBroaderImpactWizardProps = {
    goal: Goal;
};

const ConsideringBroaderImpactWizard: FC<
    ConsideringBroaderImpactWizardProps
> = ({ goal }) => {
    const apiState = api.useUtils();

    const [input, setInput] = useState(goal.impactAnalysis);

    const {
        mutate: update,
        status,
        reset,
    } = api.update.goal.useMutation({
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
        <div className="flex flex-col gap-1">
            <Textarea
                value={input}
                setValue={setInput}
                status={status}
                onFinishedTyping={() => {
                    if (input !== goal.impactAnalysis) {
                        update({
                            impactAnalysis: input,
                            goalId: goal.id,
                        });
                    }
                }}
                maxWords={300}
            />
        </div>
    );
};
