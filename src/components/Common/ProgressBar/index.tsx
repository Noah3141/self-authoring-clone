import classNames from "classnames";
import { useRef, type FC } from "react";

import styles from "./index.module.css";

type ProgressBarProps = {
    /** Current value */
    progress: number;
    /** Value which should be 100% */
    cap: number;
    className?: string;
};

const ProgressBar: FC<ProgressBarProps> = ({ progress, cap, className }) => {
    const chunk = 1 / cap;
    if (progress > cap) {
        progress = cap;
    }
    return (
        <div className={classNames(styles["progress-bar"], className)}>
            <div
                style={{
                    width: `${Math.max((progress / cap) * 100, 8)}% `,
                    transition: "width .125s ease-out",
                }}
                className={classNames(styles.progress)}
            >
                <div className={classNames(styles.bar)}>
                    <span className="overflow-hidden">
                        {Math.round((progress / cap) * 100)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
