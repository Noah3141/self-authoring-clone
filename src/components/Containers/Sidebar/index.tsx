import classNames from "classnames";
import { useRef, type FC } from "react";

import styles from "./index.module.css";
import IconButton from "~/components/Common/IconButton";
import { MapIcon } from "@heroicons/react/24/solid";
import { useSidebarContext } from "~/server/contexts";
import { useRouter } from "next/router";
import SidebarSection from "./SidebarSection";
import Tile from "./SidebarSection/SidebarTile";
import Subtile from "./SidebarSection/SidebarTile/SidebarSubtile";
import Link from "~/components/Common/Link";
import GearIcon from "~/components/Icons/Theme/GearIcon";
import useClickOutside from "~/hooks/useClickOutside";

type SidebarProps = {
    //
};

const Sidebar: FC<SidebarProps> = ({}) => {
    const { expanded, setExpanded } = useSidebarContext();
    const section = useRouter().pathname.split("/")[1];

    // const navRef = useRef<HTMLElement>(null);
    // useClickOutside(navRef, () => setExpanded({}));

    const urlBase = `/${section}/exercise`;

    return (
        <nav className={styles.sidebar}>
            <div className={styles.buttons}>
                <IconButton
                    size="medium"
                    onClick={() => {
                        setExpanded((p) => ({ map: !p.map }));
                    }}
                    OnIcon={MapIcon}
                    tooltips={{
                        on: "Navigate",
                    }}
                    tooltipProps={{ place: "right" }}
                    isOn={!expanded.map}
                />
                <IconButton
                    size="medium"
                    OnIcon={GearIcon}
                    onClick={() => {
                        setExpanded((p) => ({ settings: !p.settings }));
                    }}
                    tooltips={{
                        on: "Settings",
                    }}
                    tooltipProps={{ place: "right" }}
                    isOn={!expanded.settings}
                />
            </div>
            <div className={styles.contents}>
                <SidebarSection
                    id="map"
                    expanded={!!expanded.map}
                    setExpanded={setExpanded}
                >
                    <Tile>
                        <Link color="neutral" href={`${urlBase}/intro`}>
                            Intro
                        </Link>
                        <Subtile href={`${urlBase}/intro`}>
                            Completing the Exercise 1
                        </Subtile>
                        <Subtile href={`${urlBase}/intro-continued`}>
                            Completing the Exercise 2
                        </Subtile>
                        <Subtile href={`${urlBase}/memory-emotion-stress`}>
                            Memory, Emotion, and Stress
                        </Subtile>
                        <Subtile href={`${urlBase}/writing`}>Writing</Subtile>
                        <Subtile href={`${urlBase}/sleeping`}>Sleeping</Subtile>
                    </Tile>
                    <Tile>
                        <Link color="neutral" href={`${urlBase}/intro`}>
                            Intro
                        </Link>
                        <Subtile href={`${urlBase}/intro`}>
                            Completing the Exercise
                        </Subtile>
                    </Tile>
                    <Tile>
                        <Link color="neutral" href={`${urlBase}/intro`}>
                            Impact of Experiences
                        </Link>
                        <Subtile href={`${urlBase}/intro`}>
                            Completing the Exercise
                        </Subtile>
                    </Tile>
                    <Tile>
                        <Link color="neutral" href={`${urlBase}/intro`}>
                            Select for Analysis
                        </Link>
                        <Subtile href={`${urlBase}/intro`}>
                            Completing the Exercise
                        </Subtile>
                    </Tile>
                </SidebarSection>

                <SidebarSection
                    expanded={!!expanded.settings}
                    setExpanded={setExpanded}
                    id="settings"
                >
                    <Tile></Tile>
                </SidebarSection>
            </div>
        </nav>
    );
};

export default Sidebar;
