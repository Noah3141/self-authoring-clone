import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import { SidebarStateContext } from "~/server/contexts";

import "~/styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const [expanded, setExpanded] = useState({});

    return (
        <SessionProvider session={session}>
            <Toaster position="top-center" />
            <SidebarStateContext.Provider value={{ expanded, setExpanded }}>
                <main className={`h-full  overflow-y-auto `}>
                    <Component {...pageProps} />
                </main>
            </SidebarStateContext.Provider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
