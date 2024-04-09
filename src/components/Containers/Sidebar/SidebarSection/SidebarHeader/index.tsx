import type { FC, PropsWithChildren } from "react";

import styles from "./index.module.css";

type SidebarHeaderProps = {
    //
};

const SidebarHeader: FC<PropsWithChildren<SidebarHeaderProps>> = ({
    children,
}) => {
    return <h1 className={styles.header}>{children}</h1>;
};

export default SidebarHeader;
