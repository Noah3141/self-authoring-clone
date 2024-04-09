import classNames from "classnames";
import { useState, type FC } from "react";

import styles from "./index.module.css";
import NavItem from "./NavItem";
import MenuIcon from "~/components/Icons/Theme/MenuIcon";
import IconButton from "~/components/Common/IconButton";
import ExitIcon from "~/components/Icons/Theme/ExitIcon";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import NavDropdown from "./NavDropdown";

const Navbar: FC = ({}) => {
    const sessionData = useSession().data;

    return (
        <nav>
            <DesktopNav session={sessionData} />
            <MobileNav session={sessionData} />
        </nav>
    );
};

type NavbarProps = {
    session: Session | null;
};

const DesktopNav: FC<NavbarProps> = ({ session }) => {
    return (
        <main className={classNames(styles.desktopNavbar, styles.nav)}>
            <div className={styles.container}>
                <section>
                    <NavItem href="/">Self Authoring v2 Desktop</NavItem>
                </section>
                <section>
                    <NavItem href="/">My Work</NavItem>
                    <NavDropdown
                        heading="Products"
                        items={[
                            { href: "/", text: "Past Authoring" },
                            { href: "/", text: "Future Authoring" },
                        ]}
                    />
                    <NavDropdown
                        heading="More"
                        items={[{ href: "/", text: "" }]}
                    />
                    <NavDropdown
                        heading="Media"
                        items={[{ href: "/", text: "" }]}
                    />
                    {!!session?.user ? (
                        <NavDropdown
                            heading={session.user.name ?? ""}
                            items={[{ href: "/", text: "Foo" }]}
                        />
                    ) : (
                        <></>
                    )}
                </section>
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
            <div className={classNames(styles.items)}>
                <NavItem href="/">Self Authoring v2 Mobile</NavItem>
                <NavItem href="/">Exit</NavItem>
            </div>
        </main>
    );
};

export default Navbar;
