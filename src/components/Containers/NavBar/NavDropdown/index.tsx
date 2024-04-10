import React, { FC, useRef, useState } from "react";

import styles from "./index.module.css";
import classNames from "classnames";
import Link from "next/link";
import ChevronIcon from "~/components/Icons/Theme/Chevron";
import useClickOutside from "~/hooks/useClickOutside";

type NavDropdownProps = {
    heading: string;
    href: string;
    items: {
        text: string;
        href: string;
    }[];
};

const NavDropdown: FC<NavDropdownProps> = ({ heading, items }) => {
    const [expanded, setExpanded] = useState(false);

    // const dropdownRef = useRef(null);
    // useClickOutside(dropdownRef, () => {
    //     setExpanded(false);
    // });

    return (
        <div
            onMouseOver={() => {
                setExpanded(true);
            }}
            onMouseLeave={() => {
                setExpanded(false);
            }}
            // ref={dropdownRef}
            className={styles.dropdown}
        >
            <div className={classNames(styles.heading, styles.hoverline)}>
                <h1>{heading}</h1>
                <ChevronIcon
                    className={classNames(styles.icon, {
                        [styles.rotate!]: expanded,
                    })}
                />
            </div>
            <div
                className={classNames(styles.items, {
                    [styles.expanded!]: expanded,
                })}
            >
                {items.map((item, i) => {
                    return (
                        <Link className={styles.item} key={i} href={item.href}>
                            {item.text}
                        </Link>
                    );
                })}
            </div>
            <div
                className={classNames(styles["hover-panel"], {
                    [styles.expanded!]: expanded,
                })}
            ></div>
        </div>
    );
};

export default NavDropdown;
