import React, { type FC } from "react";
import NextLink from "next/link";
import classNames from "classnames";
import styles from "./index.module.css";

type LinkProps = {
    children: React.ReactNode;
    href?: string;
    color?: "primary" | "neutral";
};

const Link: FC<LinkProps> = ({ href, color = "primary", children }) => {
    return (
        <NextLink
            className={classNames(styles.link, styles[color])}
            href={href ?? "#"}
        >
            {children}
        </NextLink>
    );
};

export default Link;
