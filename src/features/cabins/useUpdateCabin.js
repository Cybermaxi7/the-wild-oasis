import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/abiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
    const queryClient = useQueryClient();

     //Edit Cabin Instance
     const { mutate: updateCabin, isPending: isUpdating } = useMutation({
        mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin successfully updated!");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });
    return {updateCabin, isUpdating}
}