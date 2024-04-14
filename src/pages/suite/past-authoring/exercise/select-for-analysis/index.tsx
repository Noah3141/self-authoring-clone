import { MapIcon } from "@heroicons/react/24/solid";
import { Experience } from "@prisma/client";
import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import IconButton from "~/components/Common/IconButton";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import PlusIcon from "~/components/Icons/Theme/PlusIcon";
import SuccessIcon from "~/components/Icons/Theme/SuccessIcon";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const SelectForAnalysisPage: NextPage = () => {
    const router = useRouter();

    const { data: experiences, status: experiencesStatus } =
        api.get.experiences.byUser.useQuery();

    if (experiencesStatus == "error") {
        toast.error(
            "Something went wrong retrieving your list of experiences!",
        );
        void router.push(
            "/suite/past-authoring/exercise/impact-of-experiences",
        );
        return;
    }

    return (
        <>
            <Head>
                <title>Select for Analysis</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={20}>
                    <h1>Ten Most Critical Life Experiences</h1>
                    <p>
                        You wrote about a number of experiences in the previous
                        pages. They are all listed below. Choose the ten
                        experiences that were most important in shaping your
                        life. Each of these will be subjected to further
                        analysis, to help you understand their significance.
                    </p>

                    <div>
                        {experiencesStatus == "pending" ? (
                            <LoadingSpinner />
                        ) : (
                            <SelectForAnalysisWizard
                                experiences={experiences}
                            />
                        )}
                    </div>

                    <div className="mt-auto flex flex-row justify-between pt-6">
                        <Button
                            onClick={() => router.back()}
                            className="place-self-end"
                            color="neutral"
                            fill="hollow"
                        >
                            Previous
                        </Button>
                        <Link
                            href={`/suite/past-authoring/exercise/select-for-analysis/1`}
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

export default SelectForAnalysisPage;

type SelectForAnalysisWizardProps = {
    experiences: Experience[];
};

const SelectForAnalysisWizard: FC<SelectForAnalysisWizardProps> = ({
    experiences,
}) => {
    const allUnselected = experiences.reduce(
        (selected, experience): Record<string, boolean> => {
            selected[experience.id] = false;
            return selected;
        },
        {} as Record<string, boolean>,
    );

    const [selected, setSelected] =
        useState<Record<string, boolean>>(allUnselected);
    const selectedCount = Object.values(selected).filter((val) => val).length;

    const {
        mutate: updateSelectedForAnalysis,
        status: updatingSelectForAnalysisStatus,
        reset: resetUpdatingForAnalysis,
    } = api.update.extendedAnalyses.selectedList.useMutation({});

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-end">
                <Button
                    onClick={() => {
                        setSelected(allUnselected);
                    }}
                    size="small"
                    color="neutral"
                    fill="blank"
                >
                    Deselect all
                </Button>
            </div>
            <div className="flex flex-col gap-1">
                {experiences.map((experience) => {
                    return (
                        <div
                            key={experience.id}
                            onClick={() => {
                                setSelected((p) => ({
                                    ...p,
                                    [experience.id]: !p[experience.id],
                                }));
                            }}
                            className={classNames(
                                "flex cursor-pointer flex-row items-center rounded-lg border py-1 pe-3 ps-0 text-lg transition-all",
                                ` ${
                                    selected[experience.id]
                                        ? "border-info-300 bg-info-200 hover:border-info-200 hover:bg-info-100"
                                        : " border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                                }`,
                            )}
                        >
                            <IconButton
                                className={
                                    selected[experience.id]
                                        ? "!text-info-500"
                                        : "!text-neutral-300"
                                }
                                size="small"
                                OnIcon={SuccessIcon}
                                OffIcon={PlusIcon}
                                isOn={selected[experience.id] ?? false}
                            />

                            {experience.title}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-row justify-end">
                <span>
                    {selectedCount} / {experiences.length}
                </span>
            </div>
        </div>
    );
};
