import React, { FC } from "react";

import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

type FooterProps = {
    //
};

const Footer: FC<FooterProps> = ({}) => {
    const session = useSession();

    return (
        <footer className={styles.footer}>
            <div>© 2024 Self Authoring. All rights reserved.</div>
            <div>
                {!!session.data ? (
                    <span
                        className="cursor-pointer hover:text-primary-500"
                        onClick={async () => {
                            await signOut();
                        }}
                    >
                        Sign Out
                    </span>
                ) : (
                    <span
                        className="cursor-pointer hover:text-primary-500"
                        onClick={async () => {
                            await signIn();
                        }}
                    >
                        Sign In
                    </span>
                )}
            </div>
            {!!session.data && (
                <Link
                    className="font-bold hover:text-primary-500"
                    href={`/auth/change-password`}
                >
                    {session.data.user.email}
                </Link>
            )}
        </footer>
    );
};

export default Footer;
