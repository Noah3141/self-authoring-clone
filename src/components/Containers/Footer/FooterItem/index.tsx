import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

import styles from "./index.module.css";

export type FooterItemProps = {
    href: string;
    className?: string;
};

const NavItem: FC<PropsWithChildren<FooterItemProps>> = ({
    href = "",
    children,
    className,
}) => <></>;

export default NavItem;
