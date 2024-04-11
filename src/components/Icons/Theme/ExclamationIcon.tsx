import type { FC, SVGProps } from "react";

type LoadingSpinnerProps = SVGProps<SVGSVGElement> & {
    className?: string;
    size?: number;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
    size,
    className,
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={size ?? 24}
            height={size ?? 24}
            className={` ${className}`}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
        </svg>
    );
};

export default LoadingSpinner;
