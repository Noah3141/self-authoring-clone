import classNames from "classnames";
import {
    useEffect,
    useState,
    type FC,
    type TextareaHTMLAttributes,
} from "react";

import styles from "./index.module.css";
import SuccessIcon from "~/components/Icons/Theme/SuccessIcon";
import ExclamationIcon from "~/components/Icons/Theme/ExclamationIcon";
import LoadingSpinner from "~/components/Icons/Theme/LoadingIcon";
import useId from "~/hooks/useId";
import Tooltip from "../Tooltip";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onFinishedTyping: () => void;
    maxWords?: number;
    tooltips?: {
        success: string;
        error: string;
    };
    status: "pending" | "success" | "error" | "idle";
    className?: string;
};

function wordsIn(text: string): number {
    if (text === "") return 0;
    return text.replaceAll("  ", " ").split(" ").length;
}

const Textarea: FC<TextareaProps> = ({
    value,
    setValue,
    onFinishedTyping,
    tooltips = {
        error: "Something went wrong.",
        success: "Success!",
    },
    status = "idle",
    maxWords,
    className,
    ...props
}) => {
    const [wordCount, setWordCount] = useState(0);

    const id = useId("textarea_input");
    useEffect(() => {
        const typingTimer: NodeJS.Timeout = setTimeout(onFinishedTyping, 1000);
        return () => {
            clearTimeout(typingTimer);
        };
    }, [value]);

    return (
        <div className="relative block w-full">
            <textarea
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    setWordCount(wordsIn(e.target.value));
                }}
                className={classNames(
                    styles.textarea,
                    styles.validate,
                    className,
                )}
                autoComplete="on"
                {...props}
            />
            <label className={styles.label}>
                {wordCount} {maxWords ? `/ ${maxWords} ` : <></>}
                {wordCount === 0 ? "words" : wordCount < 2 ? "word" : "words"}
                <span className="relative w-4">
                    <div
                        id={`${id}_success`}
                        className={classNames(
                            styles.icon,
                            {
                                [styles.visible!]:
                                    status === "success" || status === "idle",
                            },
                            {
                                "text-success-500": status === "success",
                                "text-neutral-300": status === "idle",
                            },
                        )}
                    >
                        <SuccessIcon size={20} />
                    </div>

                    <div
                        id={`${id}_error`}
                        className={classNames("text-danger-500", styles.icon, {
                            [styles.visible!]: status === "error",
                        })}
                    >
                        <ExclamationIcon size={20} />
                    </div>
                    <div
                        className={classNames("text-info-500", styles.icon, {
                            [styles.visible!]: status === "pending",
                        })}
                    >
                        <LoadingSpinner size={16} />
                    </div>
                </span>
            </label>
            {!!tooltips && (
                <>
                    <Tooltip id={`${id}_success`}>{tooltips.success}</Tooltip>
                    <Tooltip id={`${id}_error`}>{tooltips.error}</Tooltip>
                </>
            )}
        </div>
    );
};

export default Textarea;
