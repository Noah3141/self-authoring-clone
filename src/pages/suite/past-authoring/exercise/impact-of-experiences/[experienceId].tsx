import { Experience } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Textarea from "~/components/Common/Textarea";
import TextInput from "~/components/Common/TextInput";
import Tooltip from "~/components/Common/Tooltip";
import TrashIcon from "~/components/Icons/Theme/TrashIcon";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const ImpactOfExperiencePage: NextPage = () => {
    const apiState = api.useUtils();
    const router = useRouter();
    const urlExperienceId = router.query.experienceId as string;
    const { data: experienceData, status: experienceStatus } =
        api.get.experiences.byId.withOrds.useQuery({
            experienceId: urlExperienceId,
        });

    if (experienceStatus == "pending") {
        return <LoadingSpinner />;
    }

    if (!experienceData) {
        toast.error(
            "Something went wrong determining the first experience to display!",
        );
        void apiState.get.invalidate();
        void router.push(
            "/suite/past-authoring/exercise/impact-of-experiences",
        );
        return;
    }

    const { experience, nextExperience, previousExperience } = experienceData;

    return (
        <>
            <Head>
                <title>Describing my epoch</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={30}>
                    <h1
                        className="flex w-fit flex-row items-center gap-3"
                        id="experience-title"
                    >
                        {experience.title}{" "}
                        <span className=" text-base text-neutral-300">
                            ({experience.epoch.order} - {experience.order})
                        </span>
                    </h1>
                    <Tooltip delayShow={500} id="experience-title">
                        Experience {experience.order} title
                    </Tooltip>
                    <h2>Significant Experiences from this epoch</h2>
                    <p>
                        Please outline how this experience has shaped your life
                        and contributed to making you who you are today.
                    </p>
                    <ul className="list-disc ps-6">
                        <li>
                            How has the experience changed your view of other
                            people?
                        </li>
                        <li>Of the world?</li>
                    </ul>
                    <p>Write approximately 1,000 characters.</p>

                    <BasicAnalysisWizard experience={experience} />

                    <div className="mt-auto flex flex-row justify-between pt-6">
                        <Link
                            href={
                                !!nextExperience
                                    ? `/suite/past-authoring/exercise/impact-of-experiences/${nextExperience.id}`
                                    : `/suite/past-authoring/exercise/impact-of-experiences`
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
                        <Link
                            href={
                                !!previousExperience
                                    ? `/suite/past-authoring/exercise/impact-of-experiences/${previousExperience.id}`
                                    : `/suite/past-authoring/exercise/impact-of-experiences`
                            }
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

export default ImpactOfExperiencePage;

type BasicAnalysisWizardProps = {
    experience: Experience;
};

const BasicAnalysisWizard: FC<BasicAnalysisWizardProps> = ({ experience }) => {
    const apiState = api.useUtils();

    const [input, setInput] = useState(experience.basicAnalysis);

    const {
        mutate: updateBasicAnalysis,
        status: updateStatus,
        reset: resetUpdating,
    } = api.update.experience.basicAnalysis.useMutation({
        // onSuccess: async () => await,
        onError: (e) =>
            toast.error(e.message, { id: "update-basic-analysis-toast" }),
        onSuccess: async () => {
            await apiState.get.orCreate.experiences.forEpochId.invalidate();
            await apiState.get.experiences.invalidate();
            setTimeout(() => {
                resetUpdating();
            }, 3000);
        },
    });

    return (
        <Textarea
            status={updateStatus}
            onFinishedTyping={() => {
                resetUpdating();
                if (experience.basicAnalysis !== input) {
                    updateBasicAnalysis({
                        experienceId: experience.id,
                        basicAnalysis: input,
                    });
                }
            }}
            setValue={setInput}
            value={input}
        />
    );
};
