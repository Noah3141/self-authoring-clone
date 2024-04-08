import Button from "~/components/Common/Button";
import AuthoringLayout from "~/layouts/Authoring";
import BaseLayout from "~/layouts/Base";

import { api } from "~/utils/api";

export default function Home() {
    return (
        <>
            <h1></h1>

            <Button className="place-self-end" color="neutral" fill="hollow">
                Submit
            </Button>
        </>
    );
}
