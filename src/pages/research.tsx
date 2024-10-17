import Head from "next/head";
import React from "react";
import Link from "~/components/Common/Link";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const research = () => {
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
                        <h1>Research</h1>
                    </section>

                    <div>
                        <h3>McGill Study - Journal of Applied Psychology</h3>
                        <Link href="http://individual.utoronto.ca/jacobhirsh/publications/GoalSettingJAP2010.pdf">
                            Setting, Elaborating, and Reflecting on Personal
                            Goals Improves Academic Performance{" "}
                        </Link>
                    </div>
                    <div>
                        <h3>Rotterdam Study - Nature</h3>
                        <Link href="https://www.nature.com/articles/palcomms201514">
                            A scalable goal-setting intervention closes both the
                            gender and ethnic minority achievement gap{" "}
                        </Link>
                    </div>
                    <div>
                        <h3>
                            Mohawk Study - The Higher Education Quality Council
                            of Ontario
                        </h3>
                        <Link href="https://heqco.ca/wp-content/uploads/2020/03/HEQCO-Formatted_EPRI-Mohawk.pdf">
                            Using Future Authoring to Improve Student Outcomes{" "}
                        </Link>
                    </div>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default research;
