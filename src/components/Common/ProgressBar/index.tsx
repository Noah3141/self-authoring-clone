import classNames from "classnames";
import { useId, type FC } from "react";

import styles from "./index.module.css";
import Tooltip from "../Tooltip";

type ProgressBarProps = {
    /** Current value */
    progress: number;
    /** Value which should be 100%, in minutes to complete */
    cap: number;
    className?: string;
};

const ProgressBar: FC<ProgressBarProps> = ({ progress, cap, className }) => {
    const remaining = cap - progress;

    const chunk = 1 / cap;
    if (progress > cap) {
        progress = cap;
    }

    return (
        <>
            <div
                id={`progress-bar`}
                className={classNames(styles["progress-bar"], className)}
            >
                <div
                    style={{
                        width: `${Math.max((progress / cap) * 100, 8)}% `,
                        transition: "width .125s ease-out",
                    }}
                    className={classNames(styles.progress)}
                >
                    <div className={classNames(styles.bar)}>
                        <span className="overflow-hidden pl-2">
                            {Math.round((progress / cap) * 100)}%
                        </span>
                    </div>
                </div>
            </div>
            <Tooltip id={`progress-bar`}>{remaining} mins</Tooltip>
        </>
    );
};

export default ProgressBar;
