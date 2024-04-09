import React from "react";

import classNames from "classnames";
import NextLink from "next/link";
import type { FC, PropsWithChildren } from "react";

import styles from "./index.module.css";

type NavbarItemProps = {
    href?: string;
    className?: string;
};

const NavItem: FC<PropsWithChildren<NavbarItemProps>> = ({
    children,
    href,
    className,
}) => {
    return (
        <NextLink
            className={classNames(styles.item, styles.hoverline, className)}
            href={href ?? ""}
        >
            {children}
        </NextLink>
    );
};

export default NavItem;
