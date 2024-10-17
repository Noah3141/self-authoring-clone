import Head from "next/head";
import React from "react";
import ReactPlayer from "react-player";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const SteveHilton = () => {
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
                <HomeLayout>
                    <section className="border-b border-neutral-300">
                        <h1>Steve Hilton</h1>
                    </section>
                    <p>
                        Dr. Peterson discusses the Understand Myself personality
                        assessment and the Self Authoring Suite with Steve
                        Hilton on Fox News.
                    </p>

                    <div className="mx-auto my-6 h-64 w-full shrink-0 overflow-hidden rounded-md transition-all sm:h-96 lg:h-[600px]">
                        <ReactPlayer
                            height={"100%"}
                            width={"100%"}
                            controls
                            url={`https://youtu.be/N0pZCiEHv9Q`}
                        />
                    </div>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default SteveHilton;
