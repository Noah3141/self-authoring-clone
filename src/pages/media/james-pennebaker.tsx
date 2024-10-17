import Head from "next/head";
import React from "react";
import ReactPlayer from "react-player";
import BlockQuote from "~/components/Base/BlockQuote";
import Link from "~/components/Common/Link";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const JamesPennebaker = () => {
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
                        <h1>James Pennebaker</h1>
                    </section>
                    <p>
                        Dr. James W. Pennebaker is Professor of Psychology at
                        the University of Texas at Austin, and the Executive
                        Director of Project 2021, aimed at rethinking undergrad
                        education at that university.
                    </p>
                    <BlockQuote attributedTo={"Jordan B. Peterson"}>
                        {`I first encountered Dr. Pennebaker's work when I was
                        working on the Self Authoring Suite. He conducted the
                        original work on "expressive writing," starting in the
                        1980's, showing that people's health and productivity
                        improved when they wrote about traumatic experiences or
                        uncertainty -- particularly if they constructed causal
                        accounts or plans. He has also investigated the
                        psychological significance of patterns of word use
                        (particularly about everyone's favorites, pronouns). We
                        talk about all of this, and much more.`}
                    </BlockQuote>

                    <div className="mx-auto my-6 h-64 w-full shrink-0 overflow-hidden rounded-md transition-all sm:h-96 lg:h-[600px]">
                        <ReactPlayer
                            height={"100%"}
                            width={"100%"}
                            controls
                            url={`https://www.youtube.com/embed/hJ4JEypNH2s`}
                        />
                    </div>
                    <p>{`Dr. Pennebaker's books include:`}</p>
                    <ul className="list-disc ps-8">
                        <li>
                            <Link href="http://amzn.to/2mQX09L">
                                {`"Opening Up by Writing it Down"`}
                            </Link>
                        </li>
                        <li>
                            <Link href="http://amzn.to/2m6eIWP">
                                {`"Expressive Writing: Words that Heal"`}
                            </Link>
                        </li>
                        <li>
                            <Link href="http://amzn.to/2lqfRvu">
                                {`"The Secret Life of Pronouns"`}
                            </Link>
                        </li>
                    </ul>
                    <p>{`You can find out more about Dr. Pennebaker's research, learn more about psychology, and improve your knowledge of yourself at these websites:`}</p>
                    <ul className="list-disc ps-8">
                        <li>
                            <Link href="http://bit.ly/2mQW4lY">
                                {`JW Pennebaker at U Texas Austin`}
                            </Link>
                        </li>
                        <li>
                            <Link href="http://www.liwc.net/">
                                {`JWP's computer program for word analysis`}
                            </Link>
                        </li>
                        <li>
                            <Link href="http://bit.ly/2mDUZ49">
                                {`JWP's exercises for self-understanding`}
                            </Link>
                        </li>
                        <li>
                            <Link href="http://bit.ly/2mE25pl">
                                {`JWP's Language of Truth and Lies and other videos`}
                            </Link>
                        </li>
                    </ul>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default JamesPennebaker;
