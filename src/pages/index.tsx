import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import Tooltip from "~/components/Common/Tooltip";
import UserIcon from "~/components/Icons/Theme/UserIcon";

import { api } from "~/utils/api";

export default function Home() {
    const hello = api.post.hello.useQuery({ text: "from tRPC" });

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
            <main className="">
                <div className="flex flex-row p-12">
                    <Button>
                        Profile <UserIcon />
                    </Button>
                </div>
            </main>
        </>
    );
}
