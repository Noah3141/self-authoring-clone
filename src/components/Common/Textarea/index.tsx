import classNames from "classnames";
import { useState, type FC, type TextareaHTMLAttributes } from "react";

import styles from "./index.module.css";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    maxWords?: number;
    className?: string;
};

// function wordsIn(text: string): number {
//     if (text === "") return 0;
//     return text.replaceAll("  ", " ").split(" ").length;
// }

const Textarea: FC<TextareaProps> = ({ maxWords, ...props }) => {
    const [wordCount, setWordCount] = useState(0);

    return (
        <div className="relative block w-full">
            <textarea
                onChange={(e) => {
                    setWordCount(e.target.value.length);
                }}
                className={classNames(
                    styles.textarea,
                    styles.validate,
                    classNames,
                )}
                autoComplete="on"
                {...props}
            ></textarea>
            <label className="absolute bottom-2 right-3 z-10 rounded bg-neutral-50 bg-opacity-95 px-1 text-neutral-900 text-opacity-20">
                {wordCount} {maxWords ? `/ ${maxWords} ` : <></>}
                {wordCount === 0 ? "words" : wordCount < 2 ? "word" : "words"}
            </label>
        </div>
    );
};

export default Textarea;
