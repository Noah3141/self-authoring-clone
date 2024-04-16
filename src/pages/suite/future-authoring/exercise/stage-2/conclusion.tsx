import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const FutureAuthoringStage2Intro: NextPage = () => {
    const { data: lastGoal, status: lastGoalStatus } =
        api.get.goal.last.useQuery();

    return (
        <>
            <Head>
                <title>Conclusion - Future Authoring</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={58}>
                    <h1>
                        Future Steps
                        <span className="ps-6 text-neutral-200">2.5</span>
                    </h1>
                    <p>
                        People often worry themselves unproductively by
                        constantly revisiting their goals, instead of
                        concentrating on their attainment. It is easy to
                        undermine yourself, by always questioning your aims and
                        intentions. Am I doing the right thing? Have I chosen
                        the correct goals? This leads to chronic worry,
                        unproductive behavior, and lack of opportunity to learn.
                    </p>
                    <ul className="list-disc ps-6">
                        <li>
                            Now that you have set goals, it is best to
                            concentrate on a daily or weekly basis on
                            implementing the strategies you have devised for
                            their attainment, instead of worrying about the
                            goals themselves. It is just as important to stick
                            to a plan, as it is to make a plan.
                        </li>
                        <li>
                            If you implement your goals, even if they are not
                            perfect, you will learn enough during the
                            implementation phase to make better goals next time.
                            As you continue to repeat the process, you will get
                            wiser and wiser.
                        </li>
                        <li>
                            Set aside some time every week or two - no more than
                            ten or twenty minutes - to mentally review your
                            performance. You will gather all sorts of useful
                            information that you can use to reconsider your
                            plans, down the road.
                        </li>
                    </ul>

                    <p>
                        Researchers have found that if someone performs
                        goal-setting tasks multiple times over a long period,
                        there is a greater chance of health and productivity
                        improvements.
                    </p>
                    <p>
                        As a result, you might wish to engage in this sort of
                        exercise on a regular basis, every four, six, or twelve
                        months, as your situation changes.
                    </p>

                    <div className="mt-auto flex w-full flex-row justify-between">
                        <Link
                            href={
                                lastGoal
                                    ? `/suite/future-authoring/exercise/stage-2/${lastGoal.id}/monitoring-progress`
                                    : `/suite/future-authoring/exercise/stage-2/goals`
                            }
                        >
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link href={`/suite/future-authoring/summary`}>
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

export default FutureAuthoringStage2Intro;
