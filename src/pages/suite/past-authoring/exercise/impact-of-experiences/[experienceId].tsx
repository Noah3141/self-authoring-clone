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
    const [input, setInput] = useState(
        experienceData?.experience.basicAnalysis ?? "",
    );

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
                    <h1 className="w-fit" id="experience-title">
                        {experience.title}
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

                    <Textarea
                        value={input}
                        setValue={setInput}
                        onFinishedTyping={() => {
                            // updateBasicAnalysis({
                            //     epochId: experience.epochId,
                            //     experienceId: experience.id,
                            //     basicAnalysis: input,
                            // });
                        }}
                    />

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

type ExperienceWizardProps = {
    experience: Experience;
};

const ExperienceWizard: FC<ExperienceWizardProps> = ({ experience }) => {
    const apiState = api.useUtils();

    const [titleInput, setTitleInput] = useState(experience.title);
    const [descriptionInput, setDescriptionInput] = useState(
        experience.description,
    );

    const {
        mutate: updateTitle,
        status: titleStatus,
        reset: resetTitle,
    } = api.update.experience.title.useMutation({
        // onSuccess: async () =>,
        onError: (e) => toast.error(e.message, { id: "update-title-toast" }),
        onSuccess: async () => {
            await apiState.get.orCreate.experiences.forEpochId.invalidate();
            setTimeout(() => {
                resetTitle();
            }, 3000);
        },
    });

    const {
        mutate: updateDescription,
        status: descriptionStatus,
        reset: resetDescription,
    } = api.update.experience.description.useMutation({
        // onSuccess: async () => await,
        onError: (e) =>
            toast.error(e.message, { id: "update-description-toast" }),
        onSuccess: async () => {
            await apiState.get.orCreate.experiences.forEpochId.invalidate();
            setTimeout(() => {
                resetDescription();
            }, 3000);
        },
    });

    const {
        mutate: deleteExperience,
        status: deleteStatus,
        reset: resetDeletion,
    } = api.delete.experience.byId.useMutation({
        onSuccess: async () => {
            toast.success("Experience removed!");
            await apiState.get.orCreate.experiences.forEpochId.invalidate();
            await apiState.get.epoch.byId.withOrds.invalidate();
        },
        onError: (e) =>
            toast.error(e.message, { id: "delete-experience-toast" }),
        onSettled: () => {
            setTimeout(() => {
                resetDeletion();
            }, 3000);
        },
    });

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
                <TextInput
                    status={titleStatus}
                    value={titleInput}
                    setValue={setTitleInput}
                    maxLength={100}
                    placeholder="Title"
                    className="w-full"
                    tooltips={{ success: "Saved.", error: "Could not update!" }}
                    onFinishedTyping={() => {
                        resetTitle();
                        if (experience.title !== titleInput) {
                            updateTitle({
                                experienceId: experience.id,
                                title: titleInput,
                            });
                        }
                    }}
                />
                <Button
                    status={deleteStatus}
                    id={`delete-experience-${experience.order}`}
                    fill="blank"
                    size="square"
                    color="danger"
                    className=" self-end"
                    onClick={() => {
                        deleteExperience({ experienceId: experience.id });
                    }}
                >
                    <TrashIcon size={16} />
                </Button>
                <Tooltip
                    place={"right"}
                    id={`delete-experience-${experience.order}`}
                >
                    Remove this experience and associated essays
                </Tooltip>
            </div>
            <div>
                <Textarea
                    status={descriptionStatus}
                    onFinishedTyping={() => {
                        resetDescription();
                        if (experience.description !== descriptionInput) {
                            updateDescription({
                                experienceId: experience.id,
                                description: descriptionInput,
                            });
                        }
                    }}
                    setValue={setDescriptionInput}
                    value={descriptionInput}
                />
            </div>
        </div>
    );
};
