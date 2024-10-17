import Head from "next/head";
import React from "react";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const TermsOfService = () => {
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
                        <h1>Terms of Service</h1>
                    </section>

                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Sequi explicabo incidunt unde inventore
                        necessitatibus similique vero eaque aliquam adipisci
                        cupiditate quod asperiores, eos nesciunt, illo itaque,
                        est tempore! Quia, reiciendis. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Quaerat perspiciatis
                        quas delectus ea quos. Commodi quia rem ad maxime
                        maiores eaque recusandae quis earum, sapiente, dolore
                        adipisci libero, sed ratione.
                    </p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Sequi explicabo incidunt unde inventore cupiditate
                        quod asperiores, eos nesciunt, illo itaque, est tempore!
                        Quia, reiciendis.
                    </p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Sequi explicabo incidunt unde inventore
                    </p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Sequi explicabo incidunt unde inventore
                        necessitatibus similique vero eaque aliquam adipisci
                        cupiditate quod asperiores, eos nesciunt, illo itaque,
                        est tempore! Quia, reiciendis. Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Natus explicabo
                        cupiditate, asperiores praesentium sunt ipsam nisi,
                        dolorum excepturi iure dicta eveniet officia a neque et
                        dolorem, doloremque rem aperiam voluptatum!
                    </p>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default TermsOfService;
