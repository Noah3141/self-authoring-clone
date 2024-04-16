import type { Goal } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { type FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Textarea from "~/components/Common/Textarea";
import TextInput from "~/components/Common/TextInput";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const MainGoalPage: NextPage = () => {
    const { data: mainGoal, status } =
        api.get.futureAuthoring.stage2.mainGoal.useQuery();

    if (status === "error") {
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
                <title>Main Goal</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={31}>
                    <h1>
                        Title and Briefly Describe Your Ideal Future
                        <span className="ps-6 text-neutral-200">2.1</span>
                    </h1>

                    <p>
                        {`Please specify a title and brief description for your
                        ideal future as a whole. This can be as simple as "My
                        Ideal Future," in both fields, or, if you have something
                        more personal in mind, you can specify that. Imagine
                        that you are both specifying and summarizing your
                        ambitions with this title. This will help you remember
                        what you are aiming for.`}
                    </p>
                    <p>
                        In later screens you can define, prioritize, and analyze
                        specific goals.
                    </p>

                    {!!mainGoal ? (
                        <GoalWizard goal={mainGoal} />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/intro`}
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
                            href={`/suite/future-authoring/exercise/stage-2/goals`}
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

export default MainGoalPage;

type GoalWizardProps = {
    goal: Goal;
};

export const GoalWizard: FC<GoalWizardProps> = ({ goal }) => {
    const apiState = api.useUtils();
    const [titleInput, setTitleInput] = useState(goal.title);
    const [descriptionInput, setDescriptionInput] = useState(goal.description);

    const {
        mutate: updateTitle,
        status: titleStatus,
        reset: resetTitle,
    } = api.update.goal.useMutation({
        onError: (e) => {
            void toast.error(e.message);
        },
        onSuccess: () => {
            void apiState.get.futureAuthoring.stage2.all.invalidate();
            void apiState.get.futureAuthoring.stage2.mainGoal.invalidate();
            setTimeout(() => {
                resetTitle();
            }, 3000);
        },
    });

    const {
        mutate: updateDescription,
        status: descriptionStatus,
        reset: resetDescription,
    } = api.update.goal.useMutation({
        onError: (e) => {
            void toast.error(e.message);
        },
        onSuccess: () => {
            void apiState.get.futureAuthoring.stage1.all.invalidate();
            setTimeout(() => {
                resetDescription();
            }, 3000);
        },
    });

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <h3>Goal Title</h3>
                <TextInput
                    maxLength={100}
                    status={titleStatus}
                    value={titleInput}
                    setValue={setTitleInput}
                    onFinishedTyping={() => {
                        if (titleInput !== goal.title) {
                            updateTitle({
                                goalId: goal.id,
                                title: titleInput,
                            });
                        }
                    }}
                />
            </div>
            <div className="flex flex-col gap-1">
                <h3>Goal Description</h3>
                <Textarea
                    className="!h-32 !min-h-32"
                    value={descriptionInput}
                    setValue={setDescriptionInput}
                    status={descriptionStatus}
                    onFinishedTyping={() => {
                        if (descriptionInput !== goal.description) {
                            updateDescription({
                                goalId: goal.id,
                                description: descriptionInput,
                            });
                        }
                    }}
                    maxWords={200}
                />
            </div>
        </div>
    );
};
