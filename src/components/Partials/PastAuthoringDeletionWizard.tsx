import React from "react";
import Tile from "~/components/Containers/Sidebar/SidebarSection/SidebarTile";
import DangerIcon from "../Icons/Theme/DangerIcon";
import Button from "../Common/Button";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const PastAuthoringDeletionWizard = () => {
    const router = useRouter();
    const apiState = api.useUtils();
    const { mutate: deleteAll, status: deleteStatus } =
        api.delete.epochs.all.useMutation({
            onMutate: () => {
                void toast.loading("Deleting past authoring data...", {
                    id: "delete-all-toast",
                });
            },
            onError: () => {
                void toast.error("Failed to delete past authoring data!", {
                    id: "delete-all-toast",
                });
            },
            onSuccess: () => {
                void toast.success(
                    "Success! You've got an empty canvas again.",
                    { id: "delete-all-toast" },
                );
                void apiState.invalidate();
                if (router.pathname.includes("past-authoring")) {
                    void router.push("/suite/past-authoring");
                }
            },
        });
    return (
        <Tile className="mt-auto !gap-3 !border-danger-300 !bg-danger-50 !text-danger-400">
            <h3 className="flex flex-row items-end gap-1">
                <DangerIcon className="size-6" /> Danger
            </h3>
            <Button
                onClick={() => {
                    toast(
                        (t) => {
                            return (
                                <div>
                                    <div>
                                        Are you sure you want to erase all
                                        epochs and their associated essays?
                                    </div>
                                    <div className="flex flex-row justify-between  py-2">
                                        <Button
                                            onClick={() => {
                                                toast.dismiss(t.id);
                                            }}
                                            size="small"
                                        >
                                            No!
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteAll();
                                            }}
                                            size="small"
                                        >
                                            Yes!
                                        </Button>
                                    </div>
                                </div>
                            );
                        },
                        { duration: 15_000 },
                    );
                }}
                status={deleteStatus}
                color="danger"
                fill="hollow"
            >
                Reset Past Authoring
            </Button>
        </Tile>
    );
};

export default PastAuthoringDeletionWizard;
