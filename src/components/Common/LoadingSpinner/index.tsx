import React from "react";
import { TailSpin } from "react-loader-spinner";

import styles from "./index.module.css";

const index = () => {
    return (
        <div className={styles.container}>
            <TailSpin
                visible={true}
                height="80"
                width="80"
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

export default index;
