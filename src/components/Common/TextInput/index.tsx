import classNames from "classnames";
import { useState, type InputHTMLAttributes, type FC } from "react";

import styles from "./index.module.css";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    maxWords?: number;
    className?: string;
};

const TextInput: FC<TextInputProps> = ({ maxWords, ...props }) => {
    return (
        <input
            className={classNames(
                styles["text-input"],
                styles.validate,
                classNames,
            )}
            {...props}
        />
    );
};

export default TextInput;
