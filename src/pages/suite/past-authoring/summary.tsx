import type { NextPage } from "next";
import React from "react";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const SummaryPage: NextPage = () => {
    const { data: epochs, status: epochsStatus } =
        api.get.pastAuthoring.complete.useQuery();

    if (epochsStatus == "pending") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={100}>
                    <LoadingSpinner />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    if (epochsStatus == "error") {
        return "You don't appear to have an autobiography yet!";
    }
    return (
        <BaseLayout>
            <AuthoringLayout progress={100}>
                <h1>Autobiography</h1>

                <div className="flex flex-col gap-12">
                    {epochs.map((epoch) => {
                        return (
                            <div
                                className="flex flex-col rounded-lg border border-neutral-300 p-6"
                                key={epoch.id}
                            >
                                <h2 className="mb-6 font-medium">
                                    {epoch.title}
                                </h2>
                                <div className="flex flex-col gap-6">
                                    {epoch.experiences.map((experience) => {
                                        return (
                                            <div
                                                key={experience.id}
                                                className="flex flex-col"
                                            >
                                                <h3 className="font-medium">
                                                    {experience.title}
                                                </h3>
                                                <p className="text-pretty">
                                                    {experience.description}
                                                </p>
                                                {!!experience.extendedAnalysis && (
                                                    <div className="ps-6">
                                                        <div className="flex flex-col gap-2 py-6">
                                                            <h4 className="text-lg">
                                                                Analysis of the
                                                                Event
                                                            </h4>
                                                            <p>
                                                                {
                                                                    experience
                                                                        .extendedAnalysis
                                                                        .eventAnalysis
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col gap-2 py-6">
                                                            <h4 className="text-lg">
                                                                Analysis of its
                                                                Effects
                                                            </h4>
                                                            <p>
                                                                {
                                                                    experience
                                                                        .extendedAnalysis
                                                                        .effectAnalysis
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </AuthoringLayout>
        </BaseLayout>
    );
};

export default SummaryPage;
