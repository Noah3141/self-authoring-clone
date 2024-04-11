import toast from "react-hot-toast";

export const smartToast = ({
    success,
    mutate,
    error,
}: {
    success?: string;
    mutate?: string;
    error?: string;
}) => {
    const id = crypto.randomUUID();

    return {
        onSuccess: () => toast.success(success ?? "Success!", { id }),
        onMutate: () => toast.loading(mutate ?? "Working on it...", { id }),
        onError: () => toast.error(error ?? "Something went wrong!", { id }),
    };
};
