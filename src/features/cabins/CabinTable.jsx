import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Empty from "../../ui/Empty";

export default function CabinTable() {
    const { cabins, isLoading } = useCabins();
    const [searchParams] = useSearchParams();
    if (isLoading) return <Spinner />;
    if(!cabins.length) return <Empty resourceName="cabins"/>
    // 1. FILTER
    const filterValue = searchParams.get("discount") || "all";

    let filteredCabins;
    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "with-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    if (filterValue === "no-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    // 2. SORT BY
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");
    const sortedCabins = filteredCabins.sort((a, b) => {
        if (a[field] < b[field]) return direction === "asc"? -1 : 1;
        if (a[field] > b[field]) return direction === "asc"? 1 : -1;
        return 0;
    });
    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>cabin</div>
                    <div>capacity</div>
                    <div> price</div>
                    <div>discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}
