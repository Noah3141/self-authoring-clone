import React, { DetailedHTMLProps, type FC } from "react";
import { type ColorType } from "~/styles/types";
import styles from "./index.module.css";
import classNames from "classnames";

type BannerProps = {
    kind?: ColorType;
    children: React.ReactNode;
    className?: string;
};

const Banner: FC<BannerProps> = ({
    kind = "neutral",
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={classNames(styles.banner, styles[kind], className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default Banner;
