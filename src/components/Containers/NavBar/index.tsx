import classNames from "classnames";
import { useState, type FC } from "react";

import styles from "./index.module.css";
import NavItem from "./NavItem";
import MenuIcon from "~/components/Icons/Theme/MenuIcon";
import IconButton from "~/components/Common/IconButton";
import ExitIcon from "~/components/Icons/Theme/ExitIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import NavDropdown from "./NavDropdown";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "~/components/Common/Button";

const Navbar: FC = ({}) => {
    const session = useSession().data;
    const router = useRouter();
    const section = router.pathname.split("/")[1];
    const inAuthoring = section === "suite";

    return (
        <nav>
            <DesktopNav inAuthoring={inAuthoring} session={session} />
            <MobileNav inAuthoring={inAuthoring} session={session} />
        </nav>
    );
};

type NavbarProps = {
    session: Session | null;
    inAuthoring: boolean;
};

const DesktopNav: FC<NavbarProps> = ({ inAuthoring, session }) => {
    const router = useRouter();

    return (
        <main className={classNames(styles.desktopNavbar, styles.nav)}>
            <div className={styles.container}>
                <section>
                    <span>Self Authoring</span>
                </section>
                {!inAuthoring && (
                    <section>
                        {!!session?.user && (
                            <NavItem href="/dashboard">My Work</NavItem>
                        )}
                        <NavDropdown
                            href="/products"
                            heading="Products"
                            items={[
                                {
                                    href: "/products/past-authoring",
                                    text: "Past Authoring",
                                },
                                {
                                    href: "/products/future-authoring",
                                    text: "Future Authoring",
                                },
                                {
                                    href: "/products/buy-it-for-a-friend",
                                    text: "Buy it for a friend",
                                },
                                {
                                    href: "/products/redeem-a-voucher",
                                    text: "Redeem a voucher",
                                },
                            ]}
                        />
                        <NavDropdown
                            heading="More"
                            items={[
                                { href: "/faq", text: "FAQ" },
                                { href: "/privacy", text: "Privacy" },
                                {
                                    href: "/terms-of-service",
                                    text: "Terms of Service",
                                },
                                { href: "/research", text: "Research" },
                            ]}
                        />
                        <NavDropdown
                            heading="Media"
                            items={[
                                {
                                    href: "/media/james-pennebaker",
                                    text: "James Pennebaker",
                                },
                                { href: "/media/npr", text: "NPR" },
                                {
                                    href: "/media/oprah-magazine",
                                    text: "Oprah Magazine",
                                },
                                {
                                    href: "/media/steve-hilton",
                                    text: "Steve Hilton",
                                },
                            ]}
                        />
                        {!!session?.user ? (
                            <NavItem
                                onClick={async () => {
                                    await signOut();
                                    await router.push("/");
                                }}
                            >
                                Sign out
                            </NavItem>
                        ) : (
                            <NavItem
                                onClick={async () => {
                                    await signIn();
                                }}
                            >
                                Sign In
                            </NavItem>
                        )}
                    </section>
                )}
                {inAuthoring && (
                    <section>
                        <NavItem href="/">Exit</NavItem>
                    </section>
                )}
            </div>
        </main>
    );
};

const MobileNav: FC<NavbarProps> = ({ session }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <main className={classNames(styles.mobileNavbar)}>
            <div className={styles.nav}>
                <IconButton
                    onClick={() => {
                        setExpanded((p) => !p);
                    }}
                    OffIcon={ExitIcon}
                    OnIcon={MenuIcon}
                    isOn={!expanded}
                />
            </div>
            <div
                className={classNames(styles.items, {
                    [styles.expanded!]: expanded,
                })}
            >
                <Link className="p-3" href="/">
                    <Button color="neutral" fill="solid">
                        Exit Self Authoring
                    </Button>
                </Link>
            </div>
        </main>
    );
};

export default Navbar;
