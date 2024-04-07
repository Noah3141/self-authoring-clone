import classNames from "classnames";
import React, { type FC, type PropsWithChildren } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import styles from "./index.module.css";
import { createId } from "@paralleldrive/cuid2";

type TooltipProps = {
    contents: React.ReactNode;
    size?: "mini" | "normal";
    className?: string;
};

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
    size = "normal",
    children,
    contents,
    className,
}) => {
    const id = createId();
    return (
        <>
            <div id={id}>{children}</div>
            <ReactTooltip
                opacity={0.9}
                delayShow={300}
                className={classNames(styles.tooltip)}
                anchorSelect={`#${id}`}
            >
                <div className={classNames(styles[size], className)}>
                    {contents}
                </div>
            </ReactTooltip>
        </>
    );
};

export default Tooltip;
