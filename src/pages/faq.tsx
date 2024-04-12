import Head from "next/head";
import React from "react";
import Link from "~/components/Common/Link";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const FaqPage = () => {
    return (
        <>
            <Head>
                <title>FAQ</title>
                <meta
                    name="description"
                    content="Frequently asked questions about Self Authoring"
                />
            </Head>
            <BaseLayout>
                <HomeLayout>
                    <section className="border-b border-neutral-300">
                        <h1>FAQ</h1>
                    </section>
                    <section className="flex flex-col gap-3">
                        <Link href="#">Contact Us Here</Link>
                        <h3 className=" font-bold">
                            In what order should I write the programs?
                        </h3>
                        <p>
                            Our users each have their own experiences,
                            circumstances, and needs. Some people benefit from
                            doing the Past Authoring exercise first. One
                            approach is to do the Present Authoring Faults
                            exercise first, to sharpen your sense of self
                            criticism, the Future Authoring exercise next, to
                            formulate a plan, then the Present Authoring Virtues
                            exercise, to think about capitalizing on your
                            strengths, and finally the Past Authoring exercise.
                            However, if you have significant issues in your past
                            that are still causing you some trouble, you might
                            consider starting with the Past Authoring exercise.
                            You should do it in the order that you think will
                            benefit you the most.
                        </p>
                        <h3 className=" font-bold">
                            Can I download the program or write it offline?
                        </h3>
                        <p>
                            At this time there is no option to download the Self
                            Authoring programs and complete them offline. Some
                            people choose to complete the program in a
                            word-processor, or by hand, and put some filler text
                            in the program.
                        </p>
                        <p>
                            Another thing to be aware of is that the programs
                            are designed to keep track of your word count and to
                            have time limits. This is to keep answers below a
                            certain length, and so people don’t spend too much
                            time on a particular answer.
                        </p>
                        <h3 className=" font-bold">
                            Can I write the program in any language?
                        </h3>
                        <p>
                            The programs are most effective when the writer is
                            working in their most fluent language, so it is
                            encouraged.
                        </p>
                        <h3 className=" font-bold">
                            Does the program have an expiration after I purchase
                            it?
                        </h3>
                        <p>
                            It does not expire, so you can take as long as you’d
                            like to complete the programs. Remember that you can
                            return to your work at any time. You do not have to
                            complete the programs in one sitting. In fact,
                            sleeping between periods of work likely helps the
                            process produce the changes in outlook and memory
                            reorganization that it is designed to produce.
                        </p>
                        <h3 className=" font-bold">
                            Approximately how long does a single program take?
                        </h3>
                        <p>
                            Each program usually takes 4-5 hours, but we
                            recommend you divide this time up over multiple
                            sessions and beginning each session with a
                            refreshed, and well-rested mind.
                        </p>
                        <ul>
                            <li>Other Suggestions:</li>
                            <li>
                                {" "}
                                Consider watching the TEDx talk “The Reality of
                                Potential”.
                            </li>
                            <li>
                                {" "}
                                Read this paper explaining the science behind
                                the Self Authoring Suite.
                            </li>
                            <li>
                                {" "}
                                If you have a problem that these tips couldn’t
                                solve, please contact us at the form here. We
                                will get back to you as soon as possible.
                            </li>
                        </ul>
                        <p></p>
                    </section>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default FaqPage;
