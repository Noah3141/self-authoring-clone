import classNames from "classnames";
import type { PropsWithChildren, FC } from "react";

import styles from "./index.module.css";
import Link from "next/link";

type SidebarSubtileProps = {
    href: string;
};

const SidebarSubtile: FC<PropsWithChildren<SidebarSubtileProps>> = ({
    href,
    children,
}) => {
    return (
        <Link
            passHref
            href={href}
            className={classNames(styles["sidebar-subtile"])}
        >
            {children}
        </Link>
    );
};

export default SidebarSubtile;
