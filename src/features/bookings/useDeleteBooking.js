import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingAPI,
        onSuccess: () => {
            
            toast.success(`Booking successfully deleted`);
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return {isDeleting, deleteBooking}
}
