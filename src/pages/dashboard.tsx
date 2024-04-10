import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Link from "~/components/Common/Link";
import BaseLayout from "~/layouts/Base";
import { api } from "~/utils/api";

const DashboardPage = () => {
    const session = useSession();
    const { data, status } = api.suite.wordCounts.all.useQuery();

    return (
        <>
            <Head>
                <title></title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 pt-36">
                    <div className="border-b border-neutral-300 py-1">
                        <h1 className="text-3xl font-semibold">My Work</h1>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-3 rounded border border-neutral-300 p-3">
                        <Link href={"/suite/past-authoring"}>
                            <h3 className="inline text-xl">Past Authoring</h3>
                        </Link>
                        <div className="">
                            Words: {data?.pastAuthoring.wordCount ?? 0}
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-3 rounded border border-neutral-300 p-3">
                        <Link href={"/suite/future-authoring"}>
                            <h3 className=" text-xl">Future Authoring</h3>
                        </Link>
                        <div className="">
                            Words: {data?.futureAuthoring.wordCount ?? 0}
                        </div>
                    </div>
                </section>
            </BaseLayout>
        </>
    );
};

export default DashboardPage;
