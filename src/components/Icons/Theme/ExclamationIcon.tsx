import type { FC, SVGProps } from "react";

type LoadingSpinnerProps = SVGProps<SVGSVGElement> & {
    className?: string;
    solid?: boolean;
    size?: number;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
    size,
    className = "",
    solid = false,
    ...props
}) => {
    if (solid) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={size ?? 24}
                height={size ?? 24}
                className={` ${className}`}
                {...props}
            >
                <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                />
            </svg>
        );
    } else
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
