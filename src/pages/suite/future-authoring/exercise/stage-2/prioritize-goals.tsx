import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import { Reorder } from "framer-motion";
import { Goal } from "@prisma/client";

const MainGoalPage: NextPage = () => {
    const { data: goals, status: goalsStatus } =
        api.get.futureAuthoring.stage2.all.useQuery();

    if (goalsStatus === "error") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <SomethingsWrong />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    return (
        <>
            <Head>
                <title>Defining Goals</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={53}>
                    <h1>
                        Prioritizing Your Goals
                        <span className="ps-6 text-neutral-200">2.3</span>
                    </h1>

                    <p>
                        Please organize your goals. Give your most important
                        goal a rank of 1, your next most important goal a rank
                        of 2, and so on. You can drag and drop the goals to
                        rearrange them.
                    </p>

                    {!!goals?.length ? (
                        <GoalsPriorityListWizard goals={goals} />
                    ) : (
                        <LoadingSpinner />
                    )}

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={`/suite/future-authoring/exercise/stage-2/goals`}
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
                            href={`/suite/future-authoring/exercise/stage-2/analysis-of-goals`}
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

type GoalsPriorityListWizardProps = {
    goals: Goal[];
};

const GoalsPriorityListWizard: FC<GoalsPriorityListWizardProps> = ({
    goals,
}) => {
    const apiState = api.useUtils();

    const [orderedGoals, setOrderedGoals] = useState<Goal[]>(goals); // Used to make UI update fast while API does work

    const {
        mutate: rearrangeGoals,
        status: updateStatus,
        reset: resetUpdating,
    } = api.update.goals.priority.useMutation({
        onSuccess: () => {
            void apiState.get.futureAuthoring.stage2.all.invalidate();
        },
    });

    useEffect(() => {
        rearrangeGoals(
            orderedGoals.map((goal, newPriority) => ({
                goalId: goal.id,
                priority: newPriority + 1,
            })),
        );
    }, [orderedGoals, rearrangeGoals]);

    return (
        <Reorder.Group
            onReorder={(reorderedGoals) => {
                setOrderedGoals(
                    reorderedGoals.map((goal, newPriority) => ({
                        ...goal,
                        priority: newPriority + 1, // Change UI displayed manually, while backend changes model for real
                    })),
                );
            }}
            values={orderedGoals}
        >
            <div className="flex flex-col gap-1">
                {orderedGoals.map((goal) => {
                    return (
                        <Reorder.Item key={goal.id} value={goal}>
                            <GoalLabel goal={goal} />
                        </Reorder.Item>
                    );
                })}
            </div>
        </Reorder.Group>
    );
};

const GoalLabel = ({ goal }: { goal: Goal }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div
            onMouseDown={() => {
                setClicked(true);
            }}
            onMouseOut={() => {
                setClicked(false);
            }}
            onMouseUp={() => {
                setClicked(false);
            }}
            className={`
            flex cursor-pointer flex-row items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 
            p-3 text-lg text-neutral-500 transition-all hover:z-10 hover:border-info-200 hover:bg-info-50 hover:shadow-lg
            ${clicked && "-translate-y-[2px] scale-[101%] border-info-200 !bg-info-50 shadow-lg"}
        `}
        >
            <PriorityLabel val={goal.priority} /> {goal.title}
        </div>
    );
};

const PriorityLabel = ({ val }: { val: number }) => {
    return (
        <div
            className={`
                x grid size-10 place-items-center rounded-md border bg-info-100 text-info-400 transition-all
            `}
        >
            {val}
        </div>
    );
};
