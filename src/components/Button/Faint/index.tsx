import classNames from "classnames";
import React, { useState } from "react";
import type { ButtonHTMLAttributes, FC } from "react";

import styles from "./index.module.css";
import SuccessIcon from "~/icons/SuccessIcon";
import ErrorIcon from "~/icons/ErrorIcon";
import LoadingSpinner from "../../LoadingSpinner";
import { type ColorType } from "~/styles/types";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    kind?: ColorType;
    status?: "idle" | "pending" | "success" | "error";
    children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({
    status = "idle",
    kind = "primary",
    className,
    children,
    ...props
}) => {
    const [clicked, setClicked] = useState(false);
    return (
        <button
            className={classNames(
                styles.button,
                styles[kind],
                styles[status],
                { clicked: clicked },
                className,
            )}
            onMouseDown={() => setClicked(true)}
            onMouseUp={() => setClicked(false)}
            onMouseLeave={() => {
                setClicked(false);
            }}
            disabled={status !== "idle"}
            {...props}
        >
            <div className={styles.idle}>{children}</div>
            <div className={classNames(styles.loader, styles.pending)}>
                <LoadingSpinner />
            </div>
            <div className={classNames(styles.loader, styles.success)}>
                <SuccessIcon solid />
            </div>
            <div className={classNames(styles.loader, styles.error)}>
                <ErrorIcon />
            </div>
        </button>
    );
};

export default Button;
