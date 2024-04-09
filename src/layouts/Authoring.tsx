import type { FC, PropsWithChildren } from "react";

import styles from "./layouts.module.css";
import ProgressBar from "~/components/Common/ProgressBar";
import WithSidebar from "~/components/Inc/withSidebar";

type AuthoringLayoutProps = {
    //
};

const AuthoringLayout: FC<PropsWithChildren<AuthoringLayoutProps>> = ({
    children,
}) => (
    <div className={styles.authoringLayout}>
        <WithSidebar />
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <ProgressBar className="place-self-end" progress={0} cap={17} />
                {children}
            </div>
        </div>
    </div>
);

export default AuthoringLayout;
