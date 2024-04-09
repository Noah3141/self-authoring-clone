import { useId as reactId } from "react";

const useId = (pre: string): string => {
    return `${pre}_${reactId().replaceAll(":", "_")}`;
};

export default useId;
