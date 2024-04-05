import classNames from "classnames";
import React, { useState } from "react";
import type { ButtonHTMLAttributes, FC } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { type ColorType } from "~/styles/types";
import styles from "./index.module.css";
import LoadingSpinner from "../../LoadingSpinner";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    kind?: ColorType;
    status?: "idle" | "pending" | "success" | "error";
    uncheckedIcon?: React.ReactNode;
    checkedIcon?: React.ReactNode;
    onToggle: React.MouseEventHandler<HTMLButtonElement>;
};

const ToggleButton: FC<ButtonProps> = ({
    status = "idle",
    kind = "primary",
    uncheckedIcon = <PlusCircleIcon />,
    checkedIcon = <CheckCircleIcon />,
    onToggle,
    ...props
}) => {
    const [checked, setChecked] = useState(false);
    return (
        <button
            className={classNames(
                styles.button,
                styles[kind],
                styles[status],
                checked ? styles.checked : styles.unchecked,
                props.className,
            )}
            onClick={e => {
                void onToggle(e);
                setChecked(p => !p);
            }}
            disabled={status !== "idle"}
            {...props}
        >
            <div
                className={classNames(
                    styles.icon,
                    status === "idle" && checked && styles.checked,
                )}
            >
                {checkedIcon}
            </div>
            <div
                className={classNames(
                    styles.icon,
                    status === "idle" && !checked && styles.unchecked,
                )}
            >
                {uncheckedIcon}
            </div>
            <div
                className={classNames(
                    styles.loading,
                    status === "pending" && styles.active,
                )}
            >
                <LoadingSpinner />
            </div>
        </button>
    );
};

export default ToggleButton;
