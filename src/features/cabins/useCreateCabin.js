import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/abiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    //Create Cabind instance
    const { mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: createUpdateCabin,
        onSuccess: () => {
            toast.success("New Cabin Succesfully Created!");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
    return {createCabin, isCreating}
}