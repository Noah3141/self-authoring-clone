import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import Footer from "~/components/Containers/Footer";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className={styles.homeLayout}>
        {children}
        <Footer />
    </div>
);

export default HomeLayout;
