import classNames from "classnames";
import { useState, type FC } from "react";

import styles from "./index.module.css";
import NavItem from "./NavItem";
import MenuIcon from "~/components/Icons/Theme/MenuIcon";
import IconButton from "~/components/Common/IconButton";
import ExitIcon from "~/components/Icons/Theme/ExitIcon";

type NavbarProps = {
    //
};

const Navbar: FC<NavbarProps> = ({}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <nav
            className={classNames(styles.navbar, {
                [styles.expanded!]: expanded,
            })}
        >
            <div
                className={classNames(styles.items, {
                    [styles.expanded!]: expanded,
                })}
            >
                <NavItem href="/">Self Authoring v2</NavItem>
                <NavItem href="/">Exit</NavItem>
            </div>
            <div className="md:hidden">
                <IconButton
                    onClick={() => {
                        setExpanded((p) => !p);
                    }}
                    OffIcon={ExitIcon}
                    OnIcon={MenuIcon}
                    isOn={!expanded}
                />
            </div>
        </nav>
    );
};

export default Navbar;
