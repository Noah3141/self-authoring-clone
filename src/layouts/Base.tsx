"use client";

import type { FC, PropsWithChildren } from "react";

import Navbar from "~/components/Containers/NavBar";

import styles from "./layouts.module.css";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
    <main className={styles.baseLayout}>
        <Navbar />
        {children}
    </main>
);

export default BaseLayout;
