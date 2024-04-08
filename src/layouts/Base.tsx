import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import Navbar from "~/components/Containers/NavBar";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
    <main className={styles.baseLayout}>
        <Navbar />
        {children}
    </main>
);

export default BaseLayout;
