import { type Epoch } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { type FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import TextInput from "~/components/Common/TextInput";
import SomethingsWrong from "~/components/Partials/SomethingsWrong";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

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
    const { mutate: updateEpochTitle, status } =
        api.update.epoch.title.useMutation({
            onMutate: () =>
                toast.loading("Loading...", { id: "update-title-toast" }),
            onSuccess: () =>
                toast.success("Success!", { id: "update-title-toast" }),
            onError: () => toast.error("Error!", { id: "update-title-toast" }),
        });

    return (
        <div className="flex flex-col gap-3">
            <h2>Epoch {epoch.order}</h2>
            <TextInput
                loading={status == "pending"}
                value={input}
                setValue={setInput}
                onFinishedTyping={() => {
                    if (epoch.title !== input) {
                        updateEpochTitle({
                            epochId: epoch.id,
                            title: input,
                        });
                    }
                }}
            />
        </div>
    );
};
