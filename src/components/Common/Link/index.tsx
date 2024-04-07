import React, { type FC } from "react";
import NextLink from "next/link";
import classNames from "classnames";
import styles from "./index.module.css";
import { type Color } from "~/styles/types";

type LinkProps = {
    children: React.ReactNode;
    href?: string;
    color?: Color;
};

const Link: FC<LinkProps> = ({ href, color = "primary", children }) => {
    return (
        <NextLink
            className={classNames(styles.link, styles[color])}
            href={href ?? "#"}
        >
            <div className={classNames(styles.text)}>{children}</div>
        </NextLink>
    );
};

export default Link;
