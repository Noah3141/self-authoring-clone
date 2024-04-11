import Head from "next/head";
import React from "react";
import NotFound from "~/components/Partials/NotFound";

const PageNotFound = () => {
    return (
        <>
            <Head>
                <title>Page not found</title>
                <meta name="description" content="Page not found!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NotFound />
        </>
    );
};

export default PageNotFound;
