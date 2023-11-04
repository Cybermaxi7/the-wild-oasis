import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField="discount"
                options={[
                    { value: "all", label: "All" },
                    { value: "with-discount", label: "With discount" },
                    { value: "no-discount", label: "No discount" },
                ]}
            />
            <SortBy options={[
                {value: "name-asc", label: 'Sort by name [A - Z]'},
                {value: "name-desc", label: 'Sort by name [Z - Za'},
                {value: "regularPrice-desc", label: 'Sort by price (high-first)'},
                {value: "regularPrice-asc", label: 'Sort by price (low-first)'},
                {value: "maxCapacity-desc", label: 'Sort by capacity (high-first)'},
                {value: "maxCapacity-asc", label: 'Sort by capacity (low-first)'},
            ]}/>
        </TableOperations>
    );
}
