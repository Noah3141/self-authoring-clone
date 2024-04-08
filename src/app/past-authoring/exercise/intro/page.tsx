import Link from "next/link";
import Button from "~/components/Common/Button";
import ProgressBar from "~/components/Common/ProgressBar";

import { type FC } from "react";

const Page: FC = () => {
    return (
        <>
            <h1>Completing the Exercise 1</h1>
            <p>
                Welcome to the Past Authoring (Autobiography) component of the
                self-authoring suite. This exercise is designed to help you
                develop a clearer sense of your past, by writing your own story.
                Understanding the defining moments of your life can help to
                illuminate your present situation, and make it easier to plan
                and determine your future direction.
            </p>
            <p>
                During this exercise, you will be presented with a series of
                pages, providing information, or asking you to define and
                describe different periods or epochs of your life, and the
                experiences you had during those epochs.
            </p>

            <p>
                You can come back to the exercise later, and resume your work.
                All your previous work will be waiting for you, and you will be
                taken to the last point in the exercise that you had completed.
            </p>
            <div className="flex flex-row justify-between">
                <Link href={`/past-authoring/`}>
                    <Button
                        className="place-self-end"
                        color="neutral"
                        fill="hollow"
                    >
                        Previous
                    </Button>
                </Link>
                <Link href={`/past-authoring/exercise/intro-continued`}>
                    <Button
                        className="place-self-end"
                        color="neutral"
                        fill="hollow"
                    >
                        Next
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default Page;
