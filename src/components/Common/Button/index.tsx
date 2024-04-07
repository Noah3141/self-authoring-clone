import React, { type PropsWithChildren, type FC } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

type ButtonProps = {
    fill?: "hollow" | "filled" | "splash";
    color?: "primary" | "neutral";
};

const index: FC<PropsWithChildren<ButtonProps>> = ({
    children,
    fill = "hollow",
    color = "neutral",
}) => {
    return (
        <button
            className={classNames(styles.button, styles[`${fill}-${color}`])}
        >
            <div>{children}</div>
        </button>
    );
};

export default index;
