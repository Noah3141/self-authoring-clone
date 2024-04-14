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

const ListEpochExperiencesPage: NextPage = () => {
    const router = useRouter();
    const apiState = api.useUtils();
    const urlEpochId = router.query.epochId as string;

    const { data: epochData, status: epochStatus } =
        api.get.epoch.byId.withOrds.useQuery({
            epochId: urlEpochId,
        });

    const { data: experiences, status: experiencesStatus } =
        api.get.orCreate.experiences.forEpochId.useQuery({
            epochId: urlEpochId,
        });

    const {
        mutate: addExperience,
        status: addExperienceStatus,
        reset: resetAddExperience,
    } = api.create.experience.push.useMutation({
        onMutate: () => {
            toast.loading("Adding experience...", {
                id: "add-experience-toast",
            });
        },
        onSuccess: async () => {
            toast.success("Experience added.", { id: "add-experience-toast" });
            await apiState.get.orCreate.experiences.forEpochId.invalidate();
            await apiState.get.epoch.byId.withOrds.invalidate();
            setTimeout(() => {
                resetAddExperience();
            }, 1000);
        },
        onError: () => {
            toast.error("Something went wrong.", {
                id: "add-experience-toast",
            });
            setTimeout(() => {
                resetAddExperience();
            }, 3000);
        },
    });

    if (epochStatus == "pending") {
        return <LoadingSpinner />;
    }

    if (!epochData || !experiences) {
        toast.error(
            "Something wasn't right there... Try returning to that page from here.",
        );
        void router.push("/suite/past-authoring/exercise");
        return;
    }
    const { epoch, nextEpoch, previousEpoch } = epochData;

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
                <AuthoringLayout progress={17}>
                    <h1>{epoch.title}</h1>
                    <h2>Significant Experiences from this epoch</h2>
                    <p>
                        Please describe in detail up to six significant
                        experiences that happened to you during this period of
                        your life. You can describe positive and negative
                        experiences. We recommend describing at least four
                        significant experiences from each time period.
                    </p>
                    <p>
                        For each experience, provide a title (which will be used
                        to refer to this experience later on) and a description
                        of the experience. Later you will explore the impact
                        this experience has had on your life. Here, limit your
                        description to the event itself (approximately 1,000
                        characters).
                    </p>

                    <div className="flex flex-col gap-12">
                        {experiences.map((experience) => {
                            return (
                                <ExperienceWizard
                                    experience={experience}
                                    key={experience.id}
                                />
                            );
                        })}
                    </div>

                    <div className="self-center pt-3">
                        <Button
                            status={addExperienceStatus}
                            onClick={() => {
                                addExperience({ epochId: epoch.id });
                            }}
                            fill="blank"
                            color="primary"
                        >
                            Add Experience
                        </Button>
                    </div>

                    <div className="flex flex-row justify-between pt-6">
                        <Link
                            href={
                                !!previousEpoch
                                    ? `/suite/past-authoring/exercise/epochs/${previousEpoch.id}`
                                    : `/suite/past-authoring/exercise/epochs`
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
                                !!nextEpoch
                                    ? `/suite/past-authoring/exercise/epochs/${nextEpoch.id}`
                                    : `/suite/past-authoring/exercise/epochs`
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

export default ListEpochExperiencesPage;

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
