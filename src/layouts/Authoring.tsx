import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";

const AuthoringLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <section className={styles.authoringLayout}>{children}</section>
    </>
);

export default AuthoringLayout;
