import { type ButtonHTMLAttributes, type SVGProps, type FC } from "react";
import classNames from "classnames";

import styles from "./index.module.css";
import ExitIcon from "~/components/Icons/Theme/ExitIcon";
import Tooltip from "../Tooltip";
import useId from "~/hooks/useId";
import { ITooltip } from "react-tooltip";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    OnIcon: FC<SVGProps<SVGSVGElement>>;
    OffIcon?: FC<SVGProps<SVGSVGElement>>;
    isOn: boolean;
    tooltips?: {
        on?: string;
        off?: string;
    };
    size?: "large" | "medium" | "small";
    className?: string;
    tooltipProps?: ITooltip;
};

const IconButton: FC<IconButtonProps> = ({
    OnIcon,
    OffIcon = ExitIcon,
    size = "large",
    isOn,
    tooltips,
    className,
    tooltipProps,
    ...props
}) => {
    const onId = useId("icon_on");
    const offId = useId("icon_off");

    return (
        <button
            {...props}
            className={classNames(styles.button, styles[size], className)}
        >
            <OnIcon
                id={onId}
                style={{ width: size, height: size }}
                className={classNames({ [styles.active!]: isOn })}
            />
            {!!tooltips?.on && (
                <Tooltip {...tooltipProps} id={onId}>
                    {tooltips.on}
                </Tooltip>
            )}

            <OffIcon
                id={offId}
                style={{ width: size, height: size }}
                className={classNames({ [styles.active!]: !isOn })}
            />
            {!!tooltips?.off && (
                <Tooltip {...tooltipProps} id={offId}>
                    {tooltips.off}
                </Tooltip>
            )}
        </button>
    );
};

export default IconButton;
