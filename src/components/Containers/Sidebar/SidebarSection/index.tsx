import classNames from "classnames";
import React, {
    type FC,
    type PropsWithChildren,
    SetStateAction,
    useRef,
    useState,
} from "react";

import styles from "./index.module.css";

type SidebarSectionProps = {
    expanded: boolean;
    id: string;
};

const SidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({
    expanded,
    children,
}) => {
    return (
        <div
            className={classNames(styles["sidebar-section"], {
                [styles.expanded!]: expanded,
            })}
        >
            {children}
        </div>
    );
};

export default SidebarSection;
