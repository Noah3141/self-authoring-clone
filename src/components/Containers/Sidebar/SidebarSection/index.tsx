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
    setExpanded: (value: SetStateAction<Record<string, boolean>>) => void;
};

const SidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({
    id,
    expanded,
    setExpanded,
    children,
}) => {
    // const closeSection = () => setExpanded((p) => ({ ...p, [id]: false }));

    // const sectionRef = useRef<HTMLDivElement>(null);
    // useClickOutside(sectionRef, closeSection);

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
