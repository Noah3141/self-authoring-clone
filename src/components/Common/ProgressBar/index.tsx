import classNames from "classnames";
import { useRef, type FC } from "react";

import styles from "./index.module.css";

type ProgressBarProps = {
    /** Current value */
    progress: number;
    /** Value which should be 100% */
    cap: number;
};

const ProgressBar: FC<ProgressBarProps> = ({ progress, cap }) => {
    const chunk = 1 / cap;
    if (progress > cap) {
        progress = cap;
    }
    return (
        <div className={classNames(styles["progress-bar"])}>
            <div
                style={{
                    width: `${(progress / cap) * 100}% `,
                    transition: "width .125s ease-out",
                }}
                className={classNames(styles.progress)}
            >
                <div className={classNames(styles.bar)}>
                    <span>{Math.round((progress / cap) * 100)}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
