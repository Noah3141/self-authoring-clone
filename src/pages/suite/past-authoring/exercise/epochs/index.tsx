import { type Epoch } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
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

export default function DescriptionPage() {
    const apiState = api.useUtils();

    const { data: epochs, status: epochsStatus } =
        api.get.orCreate.epochs.byUser.useQuery();

    const {
        mutate: addEpoch,
        status,
        reset,
    } = api.create.epoch.push.useMutation({
        onMutate: () => {
            toast.loading("Adding epoch...", { id: "add-epoch-toast" });
        },
        onSuccess: async () => {
            toast.success("Epoch added.", { id: "add-epoch-toast" });
            await apiState.get.orCreate.epochs.byUser.invalidate();
            setTimeout(() => {
                reset();
            }, 1000);
        },
        onError: () => {
            toast.error("Something went wrong.", { id: "add-epoch-toast" });
            setTimeout(() => {
                reset();
            }, 3000);
        },
    });

    if (epochsStatus == "pending") {
        return <LoadingSpinner />;
    }

    if (epochsStatus == "error") {
        return <SomethingsWrong />;
    }

    return (
        <>
            <Head>
                <title>My Epochs</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <AuthoringLayout progress={14}>
                    <h1>Division of Your Life into Epochs</h1>
                    <p>
                        Please divide your experiences into seven time periods
                        that represent your life so far:{" "}
                    </p>
                    <div className="flex flex-col gap-6">
                        {epochs.map((epoch) => {
                            return <EpochWizard key={epoch.id} epoch={epoch} />;
                        })}
                    </div>
                    <div className="self-center pt-3">
                        <Button
                            status={status}
                            onClick={() => {
                                addEpoch();
                            }}
                            fill="blank"
                            color="primary"
                        >
                            Add Epoch
                        </Button>
                    </div>
                    <div className="flex flex-row justify-between pt-6">
                        <Link
                            href={`/suite/past-authoring/exercise/general-description`}
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
                            href={`/suite/past-authoring/exercise/epochs/${epochs.find((epoch) => epoch.order === 1)?.id}`}
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
