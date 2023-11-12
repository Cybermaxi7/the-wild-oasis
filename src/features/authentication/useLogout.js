import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { mutate: logout, isPending: isLoading } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate("/login", { replace: true });
            toast.success("Succesfully logged out!");
        },
    });
    return {logout, isLoading};
}
