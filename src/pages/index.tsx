import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Self Authoring</title>
                <meta
                    name="description"
                    content="Map Your Life & Chart Your Course"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BaseLayout>
                <HomeLayout>
                    <h1>Main</h1>
                    <section>
                        <Button fill="splash">
                            <Link href="/auth/sign-up">Sign Up</Link>
                        </Button>
                        <Button
                            onClick={async () => {
                                await signOut();
                            }}
                            fill="splash"
                        >
                            Sign out
                        </Button>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
}
