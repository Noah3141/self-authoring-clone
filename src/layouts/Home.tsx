import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className={styles.homeLayout}>
        <div className={styles.content}>{children}</div>
    </div>
);

export default HomeLayout;
