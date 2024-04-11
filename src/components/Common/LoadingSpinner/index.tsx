import type { FC } from "react";
import { TailSpin } from "react-loader-spinner";

import styles from "./index.module.css";

type LoadingSpinnerProps = {
    size?: number;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size }) => {
    return (
        <div className={styles.container}>
            <TailSpin
                visible={true}
                height={size ?? 80}
                width={size ?? 80}
                color="currentColor"
                ariaLabel="tail-spin-loading"
                radius="1"
                strokeWidth={"1px"}
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoadingSpinner;
