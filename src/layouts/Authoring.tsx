import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import ProgressBar from "~/components/Common/ProgressBar";
import { useRouter } from "next/router";
import Sidebar from "~/components/Containers/Sidebar";
import { title } from "~/utils/page-metadata";
import { PastAuthoringSettings } from "~/utils/page-metadata";

type AuthoringLayoutProps = {
    progress: number;
};

const AuthoringLayout: FC<PropsWithChildren<AuthoringLayoutProps>> = ({
    progress,
    children,
}) => {
    const router = useRouter();

    const suite = router.pathname.split("/")[2] ?? "";

    return (
        <div className={styles.authoringLayout}>
            <Sidebar suite={suite} />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className="flex flex-col items-end gap-3">
                        <h3 className="ml-auto text-right">{title[suite]}</h3>
                        <ProgressBar
                            className=""
                            progress={progress}
                            cap={PastAuthoringSettings.cap}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthoringLayout;
