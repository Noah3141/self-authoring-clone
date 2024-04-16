import type { NextPage } from "next";
import React from "react";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const FutureAuthoringSummaryPage: NextPage = () => {
    const { data: futureAuthoring, status: futureAuthoringStatus } =
        api.get.futureAuthoring.stage1.all.useQuery();
    const { data: goals, status: goalsStatus } =
        api.get.futureAuthoring.stage2.all.useQuery();
    const { data: mainGoal, status: mainGoalStatus } =
        api.get.futureAuthoring.stage2.mainGoal.useQuery();

    if (
        futureAuthoringStatus === "pending" ||
        goalsStatus === "pending" ||
        mainGoalStatus === "pending"
    ) {
        return (
            <BaseLayout>
                <AuthoringLayout progress={100}>
                    <LoadingSpinner />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    if (
        futureAuthoringStatus === "error" ||
        goalsStatus === "error" ||
        mainGoalStatus === "error"
    ) {
        return "You don't appear to have a goal map yet!";
    }
    return (
        <>
            <BaseLayout>
                <AuthoringLayout progress={100}>
                    <h1>Your Ideal Future</h1>

                    <section className="flex flex-col gap-6 rounded-lg border border-neutral-300">
                        <div className="flex flex-col gap-1">
                            <h2>One Thing You Could Do Better</h2>
                            <p>{futureAuthoring.oneThingYouCouldDoBetter}</p>
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
                    <section className="flex flex-col gap-6 rounded-lg border border-neutral-300">
                        <h1>Goals I Want to Achieve</h1>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-semibold">Main Goal</h2>
                            <h3>{mainGoal.title}</h3>
                            <p>{mainGoal.description}</p>
                        </div>
                        {goals.map((goal) => {
                            if (goal.title == "") {
                                return;
                            }
                            return (
                                <div
                                    key={goal.id}
                                    className="flex flex-col gap-1"
                                >
                                    <h2 className="font-semibold">
                                        {goal.title}
                                    </h2>
                                    <p>{goal.title}</p>
                                    <h3>Evaluating Your Motives</h3>
                                    <p>{goal.motiveAnalysis}</p>
                                    <h3>Considering the Broader Impact</h3>
                                    <p>{goal.impactAnalysis}</p>
                                    <h3>Considering Detailed Strategies</h3>
                                    <p>{goal.strategicAnalysis}</p>
                                    <h3>Identifying Potential Obstacles</h3>
                                    <p>{goal.obstacleAnalysis}</p>
                                    <h3>Monitoring Progress towards Goals</h3>
                                    <p>{goal.progressAnalysis}</p>
                                </div>
                            );
                        })}
                    </section>
                    <div className="flex flex-col gap-12"></div>
                </AuthoringLayout>
            </BaseLayout>
        </>
    );
};

export default FutureAuthoringSummaryPage;
