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
import GearIcon from "~/components/Icons/Theme/GearIcon";
import useClickOutside from "~/hooks/useClickOutside";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Link from "next/link";

/** Used by variants of the sidebar */
export type SidebarProps = {
    suite: string;
};

const Sidebar: FC<SidebarProps> = ({ suite }) => {
    const { data, status } = useSession();
    const { expanded, setExpanded } = useSidebarContext();

    const sidebarRef = useRef(null);

    useClickOutside(() => {
        setExpanded((p) => ({}));
    }, sidebarRef);

    return (
        <nav ref={sidebarRef} className={styles.sidebar}>
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
                <SidebarSection expanded={!!expanded.map} id="map">
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
                    id="settings"
                ></SidebarSection>
            </div>
        </nav>
    );
};

export default Sidebar;

const PastAuthoringNavigation = () => {
    const { data: userEpochs, status: userEpochsStatus } =
        api.get.epochs.byUser.useQuery();
    const { data: userExperiences, status: userExperiencesStatus } =
        api.get.experiences.byUser.alone.useQuery();
    const { data: userExtendedAnalyses, status: userExtendedAnalysesStatus } =
        api.get.extendedAnalyses.byUser.withExperience.useQuery();

    if (
        userEpochsStatus == "pending" ||
        userExperiencesStatus == "pending" ||
        userExtendedAnalysesStatus == "pending"
    )
        return <LoadingSpinner />;
    if (
        userEpochsStatus === "error" ||
        userExperiencesStatus === "error" ||
        userExtendedAnalysesStatus === "error"
    )
        return "Error encountered!";

    return (
        <>
            <Tile>
                {/* 
                    
                    RENAME AND SORT INTRO PARTS

                    */}
                <Subtile main href={`/suite/past-authoring/exercise/intro`}>
                    Intro
                </Subtile>
                <Subtile href={`/suite/past-authoring/exercise/intro`}>
                    Completing the Exercise 1
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/intro-continued`}
                >
                    Completing the Exercise 2
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/memory-emotion-stress`}
                >
                    Memory, Emotion, and Stress
                </Subtile>
                <Subtile href={`/suite/past-authoring/exercise/writing`}>
                    Writing
                </Subtile>
                <Subtile href={`/suite/past-authoring/exercise/sleeping`}>
                    Sleeping
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/attitude-while-writing`}
                >
                    Attitude While Writing
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/general-description`}
                >
                    General Description
                </Subtile>
            </Tile>
            <Tile>
                <Subtile main href={`/suite/past-authoring/exercise/epochs`}>
                    Epochs
                </Subtile>

                {userEpochs.map((epoch) => {
                    if (epoch.title)
                        return (
                            <Subtile
                                key={epoch.id}
                                href={`/suite/past-authoring/exercise/epochs/${epoch.id}`}
                            >
                                {epoch.title}
                            </Subtile>
                        );
                })}
            </Tile>
            <Tile>
                <Subtile
                    main
                    href={`/suite/past-authoring/exercise/impact-of-experiences`}
                >
                    Impact of Experiences
                </Subtile>
                {userExperiences.map((experience) => {
                    if (experience.title)
                        return (
                            <Subtile
                                href={`/suite/past-authoring/exercise/impact-of-experiences/${experience.id}`}
                                key={experience.id}
                            >
                                {experience.title}
                            </Subtile>
                        );
                })}
            </Tile>
            <Tile>
                <Subtile
                    main
                    href={`/suite/past-authoring/exercise/select-for-analysis`}
                >
                    Select for Analysis
                </Subtile>
                {userExtendedAnalyses.map((extendedAnalysis) => {
                    if (extendedAnalysis.selected)
                        return (
                            <Subtile
                                href={`/suite/past-authoring/exercise/select-for-analysis/${extendedAnalysis.experience.order}/event-analysis`}
                                key={extendedAnalysis.experienceId}
                            >
                                <div className="flex flex-col ">
                                    <h3 className="">
                                        {extendedAnalysis.experience.title}
                                    </h3>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/past-authoring/exercise/select-for-analysis/${extendedAnalysis.experience.order}/event-analysis`}
                                    >
                                        - Analysis of this event
                                    </Link>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/past-authoring/exercise/select-for-analysis/${extendedAnalysis.experience.order}/effects-analysis`}
                                    >
                                        - The effects of this event
                                    </Link>
                                </div>
                            </Subtile>
                        );
                })}
            </Tile>
        </>
    );
};

const FutureAuthoringNavigation = () => {
    return (
        <>
            <Tile>
                <Link
                    color="neutral"
                    href={`/suite/past-authoring/exercise/intro`}
                >
                    Intro
                </Link>
                <Subtile href={`/suite/past-authoring/exercise/intro`}>
                    Completing the Exercise 1
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/intro-continued`}
                >
                    Completing the Exercise 2
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/memory-emotion-stress`}
                >
                    Memory, Emotion, and Stress
                </Subtile>
                <Subtile href={`/suite/past-authoring/exercise/writing`}>
                    Writing
                </Subtile>
                <Subtile href={`/suite/past-authoring/exercise/sleeping`}>
                    Sleeping
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/attitude-while-writing`}
                >
                    Attitude While Writing
                </Subtile>
                <Subtile
                    href={`/suite/past-authoring/exercise/general-description`}
                >
                    General Description
                </Subtile>
            </Tile>
        </>
    );
};
