import classNames from "classnames";
import React, {
    FC,
    PropsWithChildren,
    SetStateAction,
    useRef,
    useState,
} from "react";

import styles from "./index.module.css";
import useClickOutside from "~/hooks/useClickOutside";

type SidebarSectionProps = {
    expanded: boolean;
    id: string;
};

const SidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({
    id,
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
