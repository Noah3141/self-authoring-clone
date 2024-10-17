import classNames from "classnames";
import React, { type PropsWithChildren, type FC } from "react";
import styles from "./index.module.css";

const BlockQuote: FC<
    PropsWithChildren<{
        attributedTo: string;
    }>
> = ({ attributedTo, children }) => {
    return (
        <div className={classNames(styles.quoteBlock)}>
            {children}
            <span className={classNames(styles.attribution)}>
                — {attributedTo}
            </span>
        </div>
    );
};

export default BlockQuote;
