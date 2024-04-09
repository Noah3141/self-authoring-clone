import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import Navbar from "~/components/Containers/NavBar";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className={styles.baseLayout}>
        <Navbar />
        {children}
    </div>
);

export default BaseLayout;
