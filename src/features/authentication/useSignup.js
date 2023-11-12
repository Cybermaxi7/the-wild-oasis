import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupAPI } from "../../services/apiAuth";
export function useSignup() {
    const { mutate: signup, isPending: isLoading } = useMutation({
        mutationFn: signupAPI,
        onSuccess: (user) => {
            console.log(user);
            toast.success(
                "User account successfully added! Please verify the new account from the user's email address"
            );
        },
    });
    return { signup, isLoading };
}
