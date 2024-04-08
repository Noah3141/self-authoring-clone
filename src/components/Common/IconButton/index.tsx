import type { ButtonHTMLAttributes, SVGProps, FC } from "react";
import classNames from "classnames";

import styles from "./index.module.css";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    OnIcon: FC<SVGProps<SVGSVGElement>>;
    OffIcon: FC<SVGProps<SVGSVGElement>>;
    isOn: boolean;
    className?: string;
};

const IconButton: FC<IconButtonProps> = ({
    OnIcon,
    OffIcon,
    isOn,
    className,
    ...props
}) => {
    return (
        <button {...props} className={classNames(styles.button, className)}>
            <OnIcon className={classNames({ [styles.active!]: isOn })} />
            <OffIcon className={classNames({ [styles.active!]: !isOn })} />
        </button>
    );
};

export default IconButton;
