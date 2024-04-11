import React, {
    type PropsWithChildren,
    type FC,
    useState,
    ButtonHTMLAttributes,
} from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import LoadingIcon from "~/components/Icons/Theme/LoadingIcon";
import SuccessIcon from "~/components/Icons/Theme/SuccessIcon";
import ExclamationIcon from "~/components/Icons/Theme/ExclamationIcon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "small" | "normal" | "square";
    fill?: "hollow" | "filled" | "splash" | "blank";
    color?: "primary" | "neutral" | "danger";
    status?: "idle" | "pending" | "error" | "success";
    iconSolid?: boolean;
    className?: string;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
    children,
    className,
    status = "idle",
    size = "normal",
    fill = "blank",
    color = "neutral",
    iconSolid = false,
    ...props
}) => {
    const [mouseDown, setMouseDown] = useState(false);
    return (
        <button
            onMouseDown={() => {
                setMouseDown(true);
            }}
            disabled={status !== "idle"}
            onMouseUp={() => {
                setMouseDown(false);
            }}
            onMouseLeave={() => {
                setMouseDown(false);
            }}
            className={classNames(
                styles.button,
                styles[size],
                styles[`${fill}-${color}`],
                {
                    [styles.clicked!]: mouseDown,
                },
                className,
            )}
            {...props}
        >
            <div className={styles.container}>
                <div
                    className={classNames(styles.contents, {
                        [styles.visible!]: status === "idle",
                    })}
                >
                    {children}
                </div>

                <div
                    className={classNames(styles.loader, styles.contents, {
                        [styles.visible!]: status === "pending",
                    })}
                >
                    <LoadingIcon size={14} />
                </div>
                <div
                    className={classNames(styles.loader, styles.contents, {
                        [styles.visible!]: status === "success",
                    })}
                >
                    <SuccessIcon solid={iconSolid} size={24} />
                </div>
                <div
                    className={classNames(styles.loader, styles.contents, {
                        [styles.visible!]: status == "error",
                    })}
                >
                    <ExclamationIcon solid={iconSolid} size={24} />
                </div>
            </div>
        </button>
    );
};

export default Button;
