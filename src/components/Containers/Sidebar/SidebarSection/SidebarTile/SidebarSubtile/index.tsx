import classNames from "classnames";
import type { PropsWithChildren, FC } from "react";

import styles from "./index.module.css";
import Link from "next/link";

type SidebarSubtileProps = {
    href: string;
    main?: boolean;
};

const SidebarSubtile: FC<PropsWithChildren<SidebarSubtileProps>> = ({
    href,
    children,
    main = false,
}) => {
    return (
        <Link
            passHref
            href={href}
            className={classNames(styles["sidebar-subtile"], {
                [styles.main!]: main,
            })}
        >
            {children}
        </Link>
    );
};

export default SidebarSubtile;
