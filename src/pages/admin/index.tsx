import type { NextPage } from "next";
import React from "react";
import Button from "~/components/Common/Button";
import Link from "next/link";
import BaseLayout from "~/layouts/Base";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import { useRouter } from "next/router";

const AdminPage: NextPage = () => {
    const session = useSession();
    const router = useRouter();

    if (session.status === "loading") {
        return <LoadingSpinner />;
    }

    if (session.status !== "authenticated") {
        void router.push("/");
    }

    if (session.data?.user.role !== "admin") {
        void router.push("/");
    }

    return (
        <BaseLayout>
            <section className="flex flex-col gap-1">
                <Link href={`/admin/users`}>
                    <Button color="neutral" fill="blank">
                        Users
                    </Button>
                </Link>
                <Link href={`/`}>
                    <Button color="neutral" fill="blank">
                        Users
                    </Button>
                </Link>
                <Link href={`/`}>
                    <Button color="neutral" fill="blank">
                        Users
                    </Button>
                </Link>
                <Link href={`/`}>
                    <Button color="neutral" fill="blank">
                        Users
                    </Button>
                </Link>
                <Link href={`/`}>
                    <Button color="neutral" fill="blank">
                        Users
                    </Button>
                </Link>
                <Link href={`/`}>
                    <Button color="neutral" fill="blank">
                        Users
                    </Button>
                </Link>
            </section>
        </BaseLayout>
    );
};

export default AdminPage;
