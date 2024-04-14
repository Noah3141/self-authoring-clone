import Head from "next/head";
import React from "react";
import Button from "~/components/Common/Button";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const FutureAuthoringProduct = () => {
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
                        <h1>Future Authoring</h1>
                    </section>
                    <section className="flex flex-col gap-3">
                        <p>
                            {`Most people have never been asked to contemplate the
                            question: "What do you hope to achieve in your life
                            and what kind of person do you want to be?"`}
                        </p>
                        <p>
                            This realization was the genesis of the Future
                            Authoring program. Dr. Jordan B. Peterson, professor
                            of Psychology at the University of Toronto, decided
                            to ask his students to sit down and write about
                            their ideal future. They were asked to specifically
                            describe the type of person they wanted to be, the
                            skills they wanted to attain, and the relationships
                            they wanted to have, among other things.
                        </p>
                        <p>
                            Note: To purchase the Future Authoring program on
                            its own, please click the Buy Now button below. To
                            get the Future Authoring program bundled with the
                            other Self Authoring programs, please check out the
                            Self Authoring Suite.
                        </p>
                        <div className="flex flex-row justify-center py-6">
                            <Button fill="solid" color="neutral">
                                Buy Now - $14.95 USD
                            </Button>
                        </div>
                        <p>
                            {`Simply through this guided contemplation, Dr.
                            Peterson's students found themselves feeling like
                            they had more direction in life. They were less
                            anxious about the uncertainty of the future, and
                            knew what they could do today to start down the path
                            of becoming the person they wanted to be.`}
                        </p>
                        <p>
                            Since that first class, the Future Authoring program
                            has been designed, refined, and deployed to
                            thousands of people. It has been found to be
                            profoundly effective at aligning goals with actions,
                            and helping people define what they want their
                            future to look like and achieve it.
                        </p>
                    </section>
                    <section className="flex flex-col gap-3">
                        <h2 className="my-6 text-2xl">How it works</h2>
                        <p>
                            The Future Authoring Program is designed to help you
                            imagine your ideal future, three to five years down
                            the road. What would your life be like if you could
                            set it up in the manner that would be best for you?
                            You will be asked to consider the people you admire,
                            things you could do better, your educational and
                            career goals, what habits you would like to improve,
                            your family life, your social network, and your
                            leisure activities.
                        </p>
                        <p>
                            Then you will be asked to write freely about your
                            ideal future, without regard for grammar or
                            spelling, for 15-20 minutes. It is best to use your
                            imagination, to daydream, during this process. After
                            that, you will be taken through a series of
                            exercises that will help you specify, in detail,
                            your ideal future, by summarizing, titling and
                            prioritizing your goals, evaluating your motives,
                            considering their personal and social impact,
                            strategizing for their attainment, identifying
                            potential obstacles and their solutions, monitoring
                            your progress, and evaluating your decisions.
                        </p>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default FutureAuthoringProduct;
