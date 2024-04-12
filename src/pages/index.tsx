import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

export default function HomePage() {
    const session = useSession();

    console.log("session.data =", session.data);

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
                    <section className="border-b border-neutral-300">
                        <h1>What is Self Authoring?</h1>
                    </section>
                    <section className="flex flex-col gap-3">
                        <h2 className="text-xl font-light text-neutral-500">
                            The Self-Authoring Suite is a series of online
                            writing programs that collectively help you explore
                            your past, present and future.
                        </h2>
                        <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between gap-3 px-12 py-12 sm:flex-row">
                            <Button color="neutral" fill="solid">
                                Purchase Full Suite
                            </Button>
                            <Button color="neutral" fill="solid">
                                More Information
                            </Button>
                        </div>
                        <div>
                            People who spend time writing carefully about
                            themselves become happier, less anxious and
                            depressed and physically healthier. They become more
                            productive, persistent and engaged in life. This is
                            because thinking about where you came from, who you
                            are and where you are going helps you chart a
                            simpler and more rewarding path through life.
                        </div>
                    </section>
                    <section className="flex flex-col gap-6 sm:flex-row">
                        <div className="h-[360px] w-[600px] shrink-0 border"></div>
                        <div>
                            <p>
                                The Past Authoring Program helps you remember,
                                articulate and analyze key positive and negative
                                life experiences.
                            </p>
                            <p>
                                The Present Authoring Program has two modules.
                                The first helps you understand and rectify your
                                personality faults. The second helps you
                                understand and develop your personality virtues.
                            </p>
                            <p>
                                The Future Authoring Program helps you envision
                                a meaningful, healthy and productive future,
                                three to five years down the road, and to
                                develop a detailed, implementable plan to make
                                that future a reality.
                            </p>
                            <p>
                                Put your past to rest! Understand and improve
                                your present personality! Design the future you
                                want to live! The Self Authoring Suite will
                                improve your life.
                            </p>
                        </div>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
}
