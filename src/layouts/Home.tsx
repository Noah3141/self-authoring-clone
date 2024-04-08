import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import Base from "./Base";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <section className={styles.homeLayout}>{children}</section>
    </>
);

export default HomeLayout;
