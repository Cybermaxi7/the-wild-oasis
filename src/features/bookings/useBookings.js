import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

//Hook for fetching the data in the first place
export function useBookings() {
    const [searchParams] = useSearchParams();
    const filteredValue = searchParams.get("status");
    const filter =
        !filteredValue || filteredValue === "all"
            ? null
            : { field: "status", value: filteredValue };
            // : { field: "totalPrice", value: 3000, method: "gte" };
    const {
        data: bookings,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bookings", filter],
        queryFn: () => getBookings({ filter }),
    });
    return { bookings, isLoading, error };
}
