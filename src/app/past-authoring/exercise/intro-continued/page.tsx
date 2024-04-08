import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import Button from "~/components/Common/Button";
import ProgressBar from "~/components/Common/ProgressBar";
import Tooltip from "~/components/Common/Tooltip";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

const Page: FC = () => {
    return (
        <>
            <h1>Completing the Exercise 1</h1>

            <p>
                We do encourage you to write in some detail, however, subject to
                those limitations. Our research indicates that better results
                are obtained as the amount written by participants increases.
            </p>
            <p>
                There is a progress bar in the top right portion of the screen,
                which displays the percentage of the exercise that you have
                already completed. If you hover over the bar with the mouse, you
                can see approximately how much time it will still take to
                complete the exercise.
            </p>
            <p>
                You may use the Index to jump to any page you have already
                completed. Clicking the [Index] link will open the index.
                Clicking it again will close it. Remember to click Save to save
                any work on the current page before using the index to jump to
                another page.
            </p>
            <p id="fo">
                After you have completed the exercise, you will be taken to a
                Summary page. You can use that page to email yourself a copy of
                your writing.
            </p>
            <Tooltip place={"bottom"} id="fo">
                Foo
            </Tooltip>
            <p>
                Before proceeding with the writing, you will be asked to read
                about 1) memory, emotion and stress, 2) the benefits of writing
                (and of sleeping in between writing sessions), and 3) adopting
                the correct attitude for beneficial writing.{" "}
            </p>
            <div className="flex flex-row justify-between">
                <Link href={`/past-authoring/exercise/intro`}>
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
