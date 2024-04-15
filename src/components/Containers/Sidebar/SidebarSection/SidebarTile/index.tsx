import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

import styles from "./index.module.css";

type SidebarTileProps = {
    className?: string;
};

const SidebarTile: FC<PropsWithChildren<SidebarTileProps>> = ({
    children,
    className = "",
}) => {
    return (
        <div className={classNames(styles["sidebar-tile"], className)}>
            {children}
        </div>
    );
};

export default SidebarTile;
