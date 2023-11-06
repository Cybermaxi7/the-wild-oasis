import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

//Hook for fetching the data in the first place
export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient()
    //FILTER
    const filteredValue = searchParams.get("status");

    const filter =
        !filteredValue || filteredValue === "all"
            ? null
            : { field: "status", value: filteredValue };
    // : { field: "totalPrice", value: 3000, method: "gte" };

    //SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, value] = sortByRaw.split("-");
    const sortBy = { field, value };

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const {
        data: {data: bookings, count} = {},
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    })
    //PREFETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE)
    if(page < pageCount)
    queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
    if(page > 1)
    queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })
    return { bookings, isLoading, error, count };
}
