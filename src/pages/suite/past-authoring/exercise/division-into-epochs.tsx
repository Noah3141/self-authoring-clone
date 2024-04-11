import { Epoch } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import TextInput from "~/components/Common/TextInput";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";
import { smartToast } from "~/utils/toast";

export default function DescriptionPage() {
    const { data: epochs, status: epochsStatus } =
        api.getOrCreate.epochs.byUser.useQuery();

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
                    {epochs.map((epoch, i) => {
                        return <EpochWizard key={i} epoch={epoch} />;
                    })}
                    <div className="flex flex-row justify-between">
                        <Link href={`/suite/past-authoring/exercise/intro`}>
                            <Button
                                className="place-self-end"
                                color="neutral"
                                fill="hollow"
                            >
                                Previous
                            </Button>
                        </Link>
                        <Link
                            href={`/suite/past-authoring/exercise/memory-emotion-stress`}
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
    const { mutate: updateEpochTitle } = api.update.epoch.title.useMutation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const onFinishedTyping = () => {
            if (epoch.title !== input) {
                toast.success("Updated");
                updateEpochTitle({
                    epochId: epoch.id,
                    title: input,
                });
            }
        };

        const typingTimer: NodeJS.Timeout = setTimeout(onFinishedTyping, 3000);

        return () => {
            clearTimeout(typingTimer);
            setLoading(false);
        };
    }, [input, epoch.id, updateEpochTitle, epoch.title]);

    return (
        <div className="flex flex-col gap-3">
            <h2>Epoch {epoch.order}</h2>
            <TextInput
                onChange={(e) => {
                    setInput(e.target.value);
                }}
                value={input}
            />
        </div>
    );
};
