import Head from "next/head";
import React from "react";
import Textarea from "~/components/Common/Textarea";
import BaseLayout from "~/layouts/Base";
import HomeLayout from "~/layouts/Home";

const PrivacyPage = () => {
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
                        <h1>Privacy</h1>
                    </section>
                    <h2 className="text-2xl ">Your Personal Data</h2>
                    <p>
                        We understand that you may be writing about personal
                        matters that must remain private. We understand that any
                        use of that information would rapidly invalidate the
                        utility of our exercises, and we will not use that
                        information in any way.
                    </p>
                    <p>
                        We retain what you write while you are completing the
                        exercises on our servers, so that you can return to the
                        exercises when you wish to. We do not read or review
                        what you have written, or subject it to any kind of
                        statistical or content analysis. We do not use what you
                        have written for any purposes other than retaining it
                        for you so that you can review/edit it.
                    </p>
                    <p>
                        We do not retain your credit card information, which is
                        processed directly by PayPal or Stripe, two of the most
                        frequently used online payment systems.
                    </p>
                    <p>
                        When you make a purchase, you provide your name and/or
                        email address, along with your credit card information,
                        directly to Paypal or Stripe. Beyond this, we do not
                        share your name or email address with anyone.
                    </p>
                    <p>
                        We will not contact you in the future, except to inform
                        you of important changes or updates to the site. If you
                        want to opt out of any potential future communications,
                        merely email us with that request.
                    </p>
                    <p>
                        You can delete what you have written at any time. You
                        can also delete your account, and all of your Self
                        Authoring data, at will, by logging into your account
                        and using the Delete Account link at the bottom of your
                        My Work page.{" "}
                    </p>
                </HomeLayout>
            </BaseLayout>
        </>
    );
};

export default PrivacyPage;
