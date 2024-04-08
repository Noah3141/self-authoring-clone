"use client";

import classNames from "classnames";
import { type PropsWithChildren, type FC, useState } from "react";
import { Tooltip as ReactTooltip, type ITooltip } from "react-tooltip";
import styles from "./index.module.css";

type TooltipProps = ITooltip & {
    size?: "mini" | "normal";
    className?: string;
    id: string;
};

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
    size = "mini",
    className,
    id,
    children,
    ...props
}) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <ReactTooltip
                delayShow={200}
                setIsOpen={setShow}
                afterShow={() => {
                    setShow(true);
                }}
                afterHide={() => {
                    setShow(false);
                }}
                classNameArrow=""
                className={classNames(styles.tooltip, { [styles.show!]: show })}
                anchorSelect={`#${id}`}
                {...props}
            >
                <div className={classNames(styles[size], className)}>
                    {children}
                </div>
            </ReactTooltip>
        </>
    );
};

export default Tooltip;
