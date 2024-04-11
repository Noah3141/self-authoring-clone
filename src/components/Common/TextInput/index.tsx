import classNames from "classnames";
import { type InputHTMLAttributes, type FC, useEffect } from "react";

import styles from "./index.module.css";
import LoadingSpinner from "../LoadingSpinner";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    onFinishedTyping: () => void;
    className?: string;
    loading: boolean;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    maxWords?: number;
};

const TextInput: FC<TextInputProps> = ({
    value,
    setValue,
    loading,
    onFinishedTyping,
    maxWords,
    ...props
}) => {
    useEffect(() => {
        const typingTimer: NodeJS.Timeout = setTimeout(onFinishedTyping, 3000);
        return () => {
            clearTimeout(typingTimer);
        };
    }, [value]);

    return (
        <div className={classNames(styles.container)}>
            <input
                className={classNames(
                    styles["text-input"],
                    styles.validate,
                    classNames,
                )}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                value={value}
                {...props}
            />
            <div
                className={classNames(styles.loader, {
                    [styles.loading!]: loading,
                })}
            >
                <LoadingSpinner size={16} />
            </div>
        </div>
    );
};

export default TextInput;
