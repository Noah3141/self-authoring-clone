import React from "react";
import { TailSpin } from "react-loader-spinner";

const index = () => {
    return (
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
    );
};

export default index;
