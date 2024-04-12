import type { NextPage } from "next";
import React from "react";
import Button from "~/components/Common/Button";
import Link from "next/link";
import BaseLayout from "~/layouts/Base";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const AdminPage: NextPage = () => {
    const session = useSession();
    const router = useRouter();

    const { data: users } = api.get.users.all.useQuery();

    if (session.status === "loading") {
        return <LoadingSpinner />;
    }

    if (session.status !== "authenticated") {
        void router.push("/");
    }

    if (session.data?.user.role !== "admin") {
        void router.push("/");
    }

    if (!users) {
        return <LoadingSpinner />;
    }

    return (
        <BaseLayout>
            <section className="p-36">
                <div className="flex flex-col gap-3 divide-y divide-neutral-300">
                    {users.map((user, i) => {
                        return (
                            <div key={i} className="p-3">
                                <div>{user.email}</div>
                                <div>{user.id}</div>
                                <div>{user.role}</div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </BaseLayout>
    );
};

export default AdminPage;
