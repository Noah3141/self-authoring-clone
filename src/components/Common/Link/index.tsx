import React, { AnchorHTMLAttributes, type FC } from "react";
import NextLink from "next/link";
import classNames from "classnames";
import styles from "./index.module.css";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    href?: string;
    color?: "primary" | "neutral";
    className?: string;
};

const Link: FC<LinkProps> = ({
    href,
    color = "primary",
    className,
    children,
    ...props
}) => {
    return (
        <NextLink
            className={classNames(styles.link, styles[color], className)}
            href={href ?? "#"}
            {...props}
        >
            {children}
        </NextLink>
    );
};

export default Link;
