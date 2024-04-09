import classNames from "classnames";
import { Dispatch, SetStateAction, SVGProps, useRef, type FC } from "react";

import styles from "./index.module.css";
import IconButton from "~/components/Common/IconButton";
import { MapIcon } from "@heroicons/react/24/solid";
import { useSidebarContext } from "~/server/contexts";
import { useRouter } from "next/router";
import SidebarSection from "./SidebarSection";
import Tile from "./SidebarSection/SidebarTile";
import Header from "./SidebarSection/SidebarHeader";
import Subtile from "./SidebarSection/SidebarTile/SidebarSubtile";
import Link from "~/components/Common/Link";
import GearIcon from "~/components/Icons/Theme/GearIcon";
import useClickOutside from "~/hooks/useClickOutside";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/Common/LoadingSpinner";

/** Used by variants of the sidebar */
export type SidebarProps = {
    navigation: (typeof Tile)[];
};

const Sidebar: FC<SidebarProps> = ({ navigation }) => {
    const { data, status } = useSession();

    const { expanded, setExpanded } = useSidebarContext();
    const suite = useRouter().pathname.split("/")[1];

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
                    <Header>Navigate</Header>
                    {suite === "past-authoring" ? (
                        <PastAuthoringNavigation />
                    ) : suite === "future-authoring" ? (
                        <FutureAuthoringNavigation />
                    ) : (
                        <></>
                    )}
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

const PastAuthoringNavigation = () => {
    const { data: userEpochs, status: userEpochsStatus } =
        api.user.epochs.all.useQuery();

    if (userEpochsStatus == "pending") return <LoadingSpinner />;
    if (userEpochsStatus == "error") return "Not found";

    return (
        <>
            <Tile>
                {/* 
                    
                    RENAME AND SORT INTRO PARTS

                    */}
                <Link color="neutral" href={`/past-authoring/intro`}>
                    Intro
                </Link>
                <Subtile href={`/past-authoring/intro`}>
                    Completing the Exercise 1
                </Subtile>
                <Subtile href={`/past-authoring/intro-continued`}>
                    Completing the Exercise 2
                </Subtile>
                <Subtile href={`/past-authoring/memory-emotion-stress`}>
                    Memory, Emotion, and Stress
                </Subtile>
                <Subtile href={`/past-authoring/writing`}>Writing</Subtile>
                <Subtile href={`/past-authoring/sleeping`}>Sleeping</Subtile>
                <Subtile href={`/past-authoring/attitude-while-writing`}>
                    Attitude While Writing
                </Subtile>
                <Subtile href={`/past-authoring/general-description`}>
                    General Description
                </Subtile>
            </Tile>
            <Tile>
                <Link color="neutral" href={`/past-authoring/epochs`}>
                    Epochs
                </Link>

                {userEpochs.map((epoch, i) => {
                    return (
                        <Subtile key={i} href={`/past-authoring/epochs/`}>
                            {epoch.title}
                        </Subtile>
                    );
                })}
            </Tile>
            <Tile>
                <Link color="neutral" href={`/past-authoring/intro`}>
                    Impact of Experiences
                </Link>
                <Subtile href={`/past-authoring/intro`}>
                    Completing the Exercise
                </Subtile>
            </Tile>
            <Tile>
                <Link color="neutral" href={`/past-authoring/intro`}>
                    Select for Analysis
                </Link>
                <Subtile href={`/past-authoring/intro`}>
                    Completing the Exercise
                </Subtile>
            </Tile>
        </>
    );
};

const FutureAuthoringNavigation = () => {
    return (
        <>
            <Tile>
                <Link color="neutral" href={`/past-authoring/intro`}>
                    Intro
                </Link>
                <Subtile href={`/past-authoring/intro`}>
                    Completing the Exercise 1
                </Subtile>
                <Subtile href={`/past-authoring/intro-continued`}>
                    Completing the Exercise 2
                </Subtile>
                <Subtile href={`/past-authoring/memory-emotion-stress`}>
                    Memory, Emotion, and Stress
                </Subtile>
                <Subtile href={`/past-authoring/writing`}>Writing</Subtile>
                <Subtile href={`/past-authoring/sleeping`}>Sleeping</Subtile>
                <Subtile href={`/past-authoring/attitude-while-writing`}>
                    Attitude While Writing
                </Subtile>
                <Subtile href={`/past-authoring/general-description`}>
                    General Description
                </Subtile>
            </Tile>
        </>
    );
};
