import { type Epoch } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import TextInput from "~/components/Common/TextInput";
import Tooltip from "~/components/Common/Tooltip";
import TrashIcon from "~/components/Icons/Theme/TrashIcon";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

export default function ImpactOfExperiencesIntroPage() {
    const apiState = api.useUtils();
    const router = useRouter();

    const { data: firstExperience, status: experiencesStatus } =
        api.get.experiences.first.useQuery();

    if (experiencesStatus === "pending") {
        return <LoadingSpinner />;
    }

    if (!firstExperience) {
        toast.error(
            "Something went wrong locating your first experience, please try again.",
        );
        void apiState.get.invalidate();
        void router.push("/suite/past-authoring/exercise/epochs");
        return;
    }
    return (
        <>
            <Head>
                <title>Impact of Experiences</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={20}>
                    <h1>Impact of Experiences</h1>
                    <p>
                        Now you will be asked to take a closer look at the
                        impact your experiences have had on your life.
                        <ul className="list-disc ps-6">
                            <li>What did the experience mean?</li>
                            <li>What can be learned from it?</li>
                        </ul>
                    </p>

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
                            href={`/suite/past-authoring/exercise/impact-of-experiences/${firstExperience.id}`}
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
}

type EpochWizardProps = {
    epoch: Epoch;
};

const EpochWizard: FC<EpochWizardProps> = ({ epoch }) => {
    const [input, setInput] = useState(epoch.title);
    const apiState = api.useUtils();
    const {
        mutate: updateEpochTitle,
        status,
        reset,
    } = api.update.epoch.title.useMutation({
        onSuccess: async () =>
            await apiState.get.orCreate.epochs.byUser.invalidate(),
        onError: (e) => toast.error(e.message, { id: "update-title-toast" }),
    });

    const {
        mutate: deleteEpoch,
        status: deleteStatus,
        reset: resetDeletion,
    } = api.delete.epoch.byId.useMutation({
        onSuccess: async () => {
            toast.success("Epoch removed!");
            await apiState.get.orCreate.epochs.invalidate();
            setTimeout(() => {
                resetDeletion();
            }, 1000);
        },
    });

    return (
        <div className="flex flex-col gap-3">
            <h2>Epoch {epoch.order}</h2>
            <div className="flex flex-row items-center gap-3">
                <TextInput
                    status={status}
                    value={input}
                    maxLength={100}
                    placeholder="Title"
                    className="w-full"
                    setValue={setInput}
                    tooltips={{ success: "Saved.", error: "Could not update!" }}
                    onFinishedTyping={() => {
                        reset();
                        if (epoch.title !== input) {
                            updateEpochTitle({
                                epochId: epoch.id,
                                title: input,
                            });
                        }
                    }}
                />
                <Button
                    status={deleteStatus}
                    id={`delete-epoch-${epoch.order}`}
                    fill="blank"
                    size="square"
                    color="danger"
                    className=" self-end"
                    onClick={() => {
                        deleteEpoch({ epochId: epoch.id });
                    }}
                >
                    <TrashIcon size={16} />
                </Button>
                <Tooltip place={"right"} id={`delete-epoch-${epoch.order}`}>
                    Remove this epoch and associated essays
                </Tooltip>
            </div>
        </div>
    );
};
