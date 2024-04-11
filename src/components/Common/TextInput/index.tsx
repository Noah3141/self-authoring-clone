import classNames from "classnames";
import { type InputHTMLAttributes, type FC, useEffect } from "react";

import styles from "./index.module.css";
import LoadingSpinner from "~/components/Icons/Theme/LoadingSpinner";
import SuccessIcon from "~/components/Icons/Theme/SuccessIcon";
import ExclamationIcon from "~/components/Icons/Theme/ExclamationIcon";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    onFinishedTyping: () => void;
    className?: string;
    status: "pending" | "success" | "error" | "idle";
    value: string;
    invalid?: boolean;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    maxWords?: number;
};

const TextInput: FC<TextInputProps> = ({
    value,
    setValue,
    status,
    invalid = false,
    onFinishedTyping,
    maxWords,
    className,
    ...props
}) => {
    useEffect(() => {
        const typingTimer: NodeJS.Timeout = setTimeout(onFinishedTyping, 1000);
        return () => {
            clearTimeout(typingTimer);
        };
    }, [value]);

    return (
        <div className={classNames(styles.container, className)}>
            <input
                className={classNames(styles["text-input"], {
                    [styles.validate!]: status === "error",
                })}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                value={value}
                {...props}
            />
            <div
                className={classNames("text-info-500", styles.icon, {
                    [styles.visible!]: status === "pending",
                })}
            >
                <LoadingSpinner size={10} />
            </div>
            <div
                className={classNames("text-success-500", styles.icon, {
                    [styles.visible!]: status === "success",
                })}
            >
                <SuccessIcon size={10} />
            </div>
            <div
                className={classNames("text-danger-500", styles.icon, {
                    [styles.visible!]: status == "error",
                })}
            >
                <ExclamationIcon size={10} />
            </div>
        </div>
    );
};

export default TextInput;
