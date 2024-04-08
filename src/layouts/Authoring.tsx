"use client";

import { type FC, type PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import ProgressBar from "~/components/Common/ProgressBar";
import { useRouter } from "next/router";

const checkpoints: Record<string, number> = {
    "": 0,
    "/": 2,
};

const AuthoringLayout: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <ProgressBar
                className="place-self-end"
                progress={checkpoints[router.pathname] ?? 0}
                cap={17}
            />

            <section className={styles.authoringLayout}>{children}</section>
        </>
    );
};

export default AuthoringLayout;
