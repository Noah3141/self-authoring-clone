import type { FC } from "react";
import LoadingSpinnerSVG from "~/components/Icons/Theme/LoadingSpinner";
import styles from "./index.module.css";

type LoadingSpinnerProps = {
    size?: number;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size }) => {
    return (
        <div className={styles.container}>
            <LoadingSpinnerSVG size={size} />
        </div>
    );
};

export default LoadingSpinner;
