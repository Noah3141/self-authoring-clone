import type {
    Epoch,
    Experience,
    ExtendedAnalysis,
    FutureAuthoring,
    Goal,
    PastAuthoring,
} from "@prisma/client";

export function wordCount(...strs: (string | null | undefined)[]): number {
    let sum = 0;
    for (const str of strs) {
        if (!!str) {
            sum += str.split(" ").length;
        }
    }
    return sum;
}

export function futureAuthoringWordCount(
    fa: FutureAuthoring & { goals: Goal[] },
): number {
    return wordCount(
        fa.careerLife,
        fa.familyLife,
        fa.idealFuture,
        fa.improveYourHabits,
        fa.leisureLife,
        fa.oneThingYouCouldDoBetter,
        fa.qualitiesYouAdmire,
        fa.socialLife,
        fa.thingsToLearnAbout,
        fa.worstFuture,
        ...fa.goals
            .map((goal): string[] => {
                return [
                    goal.description,
                    goal.impactAnalysis,
                    goal.motiveAnalysis,
                    goal.obstacleAnalysis,
                    goal.strategicAnalysis,
                ];
            })
            .reduce((a, b): string[] => a.concat(b)),
    );
}

export function pastAuthoringWordCount(
    epochs: (
        | null
        | (Epoch & {
              experiences: (
                  | null
                  | (Experience & {
                        extendedAnalysis?: ExtendedAnalysis;
                    })
              )[];
          })
    )[],
): number {
    return epochs
        .map((epoch): number => {
            return (
                epoch?.experiences
                    .map((experience) =>
                        wordCount(
                            experience?.description,
                            experience?.basicAnalysis,
                            experience?.extendedAnalysis?.effectAnalysis,
                            experience?.extendedAnalysis?.eventAnalysis,
                        ),
                    )
                    .reduce((a, b) => a + b) ?? 0
            );
        })
        .reduce((a, b): number => a + b);
}
