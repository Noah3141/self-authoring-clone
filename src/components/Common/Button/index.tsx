import React, {
    type PropsWithChildren,
    type FC,
    useState,
    ButtonHTMLAttributes,
} from "react";
import styles from "./index.module.css";
import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    fill?: "hollow" | "filled" | "splash";
    color?: "primary" | "neutral";
    className?: string;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
    children,
    className,
    fill = "hollow",
    color = "neutral",
    ...props
}) => {
    const [mouseDown, setMouseDown] = useState(false);
    return (
        <button
            onMouseDown={() => {
                setMouseDown(true);
            }}
            onMouseUp={() => {
                setMouseDown(false);
            }}
            onMouseLeave={() => {
                setMouseDown(false);
            }}
            className={classNames(
                styles.button,
                styles[`${fill}-${color}`],
                {
                    [styles.clicked!]: mouseDown,
                },
                className,
            )}
            {...props}
        >
            <div>{children}</div>
        </button>
    );
};

export default Button;
