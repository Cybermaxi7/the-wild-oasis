import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingAPI,
        onSuccess: () => {
            toast.success("Setting Updated Successfully");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message),
    });
    return { updateSetting, isUpdating };
}
