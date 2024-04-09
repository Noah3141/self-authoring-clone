import { createContext, useContext } from "react";

export type SidebarContext = {
    expanded: Record<string, boolean>;
    setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export const SidebarStateContext = createContext<SidebarContext>({
    expanded: {}, // set a default value
    setExpanded: () => {
        //
    },
});

export const useSidebarContext = () => useContext(SidebarStateContext);
