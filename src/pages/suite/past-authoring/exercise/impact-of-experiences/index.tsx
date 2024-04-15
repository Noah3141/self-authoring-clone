import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Button from "~/components/Common/Button";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

export default function ImpactOfExperiencesIntroPage() {
    const apiState = api.useUtils();
    const router = useRouter();

    const { data: firstExperience, status: experiencesStatus } =
        api.get.experiences.first.useQuery();

    const { data: lastEpoch, status: epochStatus } =
        api.get.epoch.last.useQuery();

    if (experiencesStatus === "pending" || epochStatus == "pending") {
        return (
            <BaseLayout>
                <AuthoringLayout progress={20}>
                    <LoadingSpinner />
                </AuthoringLayout>
            </BaseLayout>
        );
    }

    if (!firstExperience) {
        toast.error(
            "Something went wrong locating your first experience, please try again.",
        );
        void apiState.get.invalidate();
        void router.push("/suite/past-authoring/exercise/epochs");
        return;
    }
    if (!lastEpoch) {
        toast.error("Something went with your epoch list");
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
                        <Link
                            href={`/suite/past-authoring/exercise/epochs/${lastEpoch.id}`}
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
