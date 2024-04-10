import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import ProgressBar from "~/components/Common/ProgressBar";
import { useRouter } from "next/router";
import Sidebar from "~/components/Containers/Sidebar";

type AuthoringLayoutProps = {
    //
};

const AuthoringLayout: FC<PropsWithChildren<AuthoringLayoutProps>> = ({
    children,
}) => {
    const router = useRouter();

    const suite = router.pathname.split("/")[2] ?? "";

    return (
        <div className={styles.authoringLayout}>
            <Sidebar suite={suite} />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <ProgressBar
                        className="place-self-end"
                        progress={0}
                        cap={17}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthoringLayout;
