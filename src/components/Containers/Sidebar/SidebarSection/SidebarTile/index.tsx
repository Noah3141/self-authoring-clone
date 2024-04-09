import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

import styles from "./index.module.css";
import { useSidebarContext } from "~/server/contexts";

type SidebarTileProps = {
    //
};

const SidebarTile: FC<PropsWithChildren<SidebarTileProps>> = ({ children }) => {
    const { expanded } = useSidebarContext();
    return <div className={classNames(styles["sidebar-tile"])}>{children}</div>;
};

export default SidebarTile;
