import React from "react";

import classNames from "classnames";
import NextLink from "next/link";
import type { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";

import styles from "./index.module.css";

type NavbarItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    className?: string;
};

const NavItem: FC<PropsWithChildren<NavbarItemProps>> = ({
    children,
    href,
    className,
    ...props
}) => {
    return (
        <NextLink
            className={classNames(styles.item, styles.hoverline, className)}
            href={href ?? ""}
            {...props}
        >
            {children}
        </NextLink>
    );
};

export default NavItem;
