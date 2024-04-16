import { useRef, type FC } from "react";

import styles from "./index.module.css";
import IconButton from "~/components/Common/IconButton";
import { MapIcon } from "@heroicons/react/24/solid";
import { useSidebarContext } from "~/server/contexts";
import SidebarSection from "./SidebarSection";
import Tile from "./SidebarSection/SidebarTile";
import Header from "./SidebarSection/SidebarHeader";
import Subtile from "./SidebarSection/SidebarTile/SidebarSubtile";
import useClickOutside from "~/hooks/useClickOutside";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/Common/LoadingSpinner";
import Link from "next/link";
import EllipsisCircleIcon from "~/components/Icons/Theme/EllipsisCircle";
import PastAuthoringDeletionWizard from "~/components/Partials/PastAuthoringDeletionWizard";

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
                    OnIcon={EllipsisCircleIcon}
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

                <SidebarSection expanded={!!expanded.settings} id="settings">
                    <Header>Settings</Header>
                    <Subtile href="/suite/past-authoring/summary">
                        View Summary
                    </Subtile>
                    <PastAuthoringDeletionWizard />
                </SidebarSection>
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
                                href={`/suite/past-authoring/exercise/select-for-analysis/event-analysis?experienceId=${extendedAnalysis.experience.id}`}
                                key={extendedAnalysis.experienceId}
                            >
                                <div className="flex flex-col ">
                                    <h3 className="">
                                        {extendedAnalysis.experience.title}
                                    </h3>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/past-authoring/exercise/select-for-analysis/event-analysis?experienceId=${extendedAnalysis.experience.id}`}
                                    >
                                        - Analysis of this event
                                    </Link>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/past-authoring/exercise/select-for-analysis/effect-analysis?experienceId=${extendedAnalysis.experience.id}`}
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
    const { data: goals, status: goalsStatus } =
        api.get.futureAuthoring.stage2.all.useQuery();

    if (goalsStatus == "pending") {
        return <LoadingSpinner />;
    }
    if (goalsStatus === "error") {
        return "Error encountered!";
    }

    return (
        <>
            <Tile>
                <Subtile
                    main
                    href={`/suite/future-authoring/exercise/stage-1/intro`}
                >
                    General Instructions 1
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/intro-2`}
                >
                    General Instructions 2
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/intro-3`}
                >
                    General Instructions 3
                </Subtile>
                <Subtile
                    main
                    href={`/suite/future-authoring/exercise/stage-1/the-ideal-future`}
                >
                    The Ideal Future
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/imagining-your-ideal-future`}
                >
                    Imagining Your Ideal Future
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/one-thing-you-could-do-better`}
                >
                    One Thing You Could Do Better
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/things-to-learn-about`}
                >
                    Things to Learn About
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/improve-your-habits`}
                >
                    Improve Your Habits
                </Subtile>
                <Subtile
                    main
                    href={`/suite/future-authoring/exercise/stage-1/your-social-life`}
                >
                    Your Future Life ( )
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/your-social-life`}
                >
                    Your Social Life in the Future
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/your-leisure-life`}
                >
                    Your Leisure Life in the Future
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/your-family-life`}
                >
                    Your Family Life in the Future
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/your-career`}
                >
                    Your Career in the Future
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/qualities-you-admire`}
                >
                    Qualities You Admire
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/ideal-future-integration`}
                >
                    The Ideal Future
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-1/a-future-to-avoid`}
                >
                    A Future to Avoid
                </Subtile>
                <Subtile
                    main
                    href={`/suite/future-authoring/exercise/stage-1/ideal-future-summary`}
                >
                    Ideal Future Summary
                </Subtile>
            </Tile>
            <Tile>
                <Subtile
                    main
                    href={`/suite/future-authoring/exercise/stage-2/intro`}
                >
                    Goal Setting
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-2/main-goal`}
                >
                    Main Goal
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-2/goals`}
                >
                    Subgoals
                </Subtile>
                <Subtile
                    href={`/suite/future-authoring/exercise/stage-2/prioritize-goal`}
                >
                    Prioritize Goals
                </Subtile>
                <Subtile
                    main
                    href={`/suite/future-authoring/exercise/stage-2/`}
                >
                    Analysis of Goals
                </Subtile>

                {!!goals.length ? (
                    goals.map((goal) => {
                        return (
                            <Subtile
                                href={`/suite/future-authoring/exercise/stage-2/${goal.id}/evaluating-your-motives`}
                                key={goal.id}
                            >
                                <div className="flex flex-col">
                                    <h3>{goal.title}</h3>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/future-authoring/exercise/stage-2/${goal.id}/evaluating-your-motives`}
                                    >
                                        - Evaluating Your Motives
                                    </Link>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/future-authoring/exercise/stage-2/${goal.id}/considering-broader-impact`}
                                    >
                                        - Considering the Broad Impact
                                    </Link>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/future-authoring/exercise/stage-2/${goal.id}/identifying-solutions-to-obstacles`}
                                    >
                                        - Identifying Solutions to Potential
                                        Obstacles
                                    </Link>
                                    <Link
                                        className="ps-2 text-neutral-500 hover:text-neutral-600"
                                        href={`/suite/future-authoring/exercise/stage-2/${goal.id}/monitoring-progress`}
                                    >
                                        - Monitoring Progress
                                    </Link>
                                </div>
                            </Subtile>
                        );
                    })
                ) : (
                    <Subtile href={``}>No goals yet...</Subtile>
                )}
            </Tile>
            <Tile>
                <Subtile main href={``}>
                    Conclusion
                </Subtile>
            </Tile>
        </>
    );
};
