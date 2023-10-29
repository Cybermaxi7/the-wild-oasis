import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/abiCabins";

//Hook for fetching the data in the first place
export function useCabins() {
    const {
        data: cabins,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });
    return {cabins, isLoading, error}
}
