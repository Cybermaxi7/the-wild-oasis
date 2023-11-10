import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/apiAuth";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),
        onSuccess: (user) => {
            toast.success("Logged in successfully!")
            queryClient.setQueriesData(["user"], user)
            navigate("/dashboard");
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Provided email or password are incorrect!");
        },
    });
    return { login, isLoading}
}
