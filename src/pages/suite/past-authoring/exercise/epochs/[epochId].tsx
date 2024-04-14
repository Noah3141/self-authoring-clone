import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api, EpochWithOrds } from "~/utils/api";

const ListEpochExperiencesPage: NextPage = () => {
    const router = useRouter();
    const urlEpochId = router.query.epochId as string;

    const { data: epochData, status: epochStatus } =
        api.get.epoch.byId.withOrds.useQuery({
            epochId: urlEpochId,
        });

    if (epochStatus == "pending") {
        return <LoadingSpinner />;
    }

    if (!epochData) {
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
                                    : `/suite/past-authoring/exercise/`
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
