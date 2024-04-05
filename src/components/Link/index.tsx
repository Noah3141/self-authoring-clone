import React, { type FC } from "react";
import NextLink from "next/link";
import classNames from "classnames";
import styles from "./index.module.css";
import { type ColorType } from "~/styles/types";

type LinkProps = {
    children: React.ReactNode;
    href?: string;
    kind?: ColorType;
};

const Link: FC<LinkProps> = ({ href, kind = "primary", children }) => {
    return (
        <NextLink
            className={classNames(styles.link, styles[kind])}
            href={href ?? "#"}
        >
            <div className={classNames(styles.text)}>{children}</div>
        </NextLink>
    );
};

export default Link;
