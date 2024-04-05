import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <main className={styles.homeLayout}>{children}</main>
    </>
);

export default HomeLayout;
