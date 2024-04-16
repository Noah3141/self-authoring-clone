import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Common/Button";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";
import dynamic from "next/dynamic";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import BeakerIcon from "~/components/Icons/Theme/BeakerIcon";
import {
    CogIcon,
    MapIcon,
    TrophyIcon,
    UserGroupIcon,
    WrenchIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});

export default function HomePage() {
    const session = useSession();

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
                    <section className="flex flex-col gap-6 lg:flex-row">
                        <div className="w-[600px] shrink-0 overflow-hidden rounded-md">
                            <ReactPlayer
                                width={600}
                                controls
                                url={`https://www.youtube.com/watch?v=qa9u5t3C0AI`}
                            />
                        </div>
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
                    <section>
                        <div className="mx-auto flex w-full max-w-sm flex-col justify-between gap-6 py-6 md:flex-row">
                            <Link
                                href={"/products/future-authoring"}
                                className="group flex flex-col items-center text-xl text-primary-500 transition-all duration-500 hover:text-info-500"
                            >
                                <MapIcon className="size-20 rounded-full border p-3 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-lg" />
                                Map your Life
                            </Link>
                            <Link
                                href={"/products/future-authoring"}
                                className="group flex flex-col items-center text-xl text-primary-500 transition-all duration-500 hover:text-info-500"
                            >
                                <BeakerIcon className="size-20 rounded-full border p-3 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-lg" />
                                Chart your Course
                            </Link>
                        </div>
                    </section>
                    <section>
                        <div className="flex flex-col items-center lg:flex-row">
                            <Image
                                className="h-[600px] shrink-0"
                                src={"/static/landscape.jpg"}
                                alt=""
                                width={600}
                                height={600}
                            />
                            <div className="pt-">
                                <div className="flex flex-row items-start p-3">
                                    <div className="p-3">
                                        <WrenchIcon className="size-12" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Tried and Tested
                                        </h2>
                                        <p>
                                            The Self Authoring programs have
                                            been used in many different
                                            settings, and the results have been
                                            overwhelmingly positive.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start p-3">
                                    <div className="p-3">
                                        <CogIcon className="size-12 " />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Improve performance
                                        </h2>
                                        <p>
                                            Students who use the Self Authoring
                                            programs often see an increase in
                                            school performance, and are less
                                            likely to drop out of classes.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start p-3">
                                    <div className="p-3">
                                        <UserGroupIcon className="size-12" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Improve relationships
                                        </h2>
                                        <p>
                                            Find out what you want from both
                                            your friendships, and your intimate
                                            relationships with the Self
                                            Authoring Suite.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start p-3">
                                    <div className="p-3">
                                        <TrophyIcon className="size-12" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Dream big
                                        </h2>
                                        <p>
                                            The Self Authoring programs will
                                            help identify your highest goals,
                                            and allow you to discover the tools
                                            necessary to achieve them.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
}
