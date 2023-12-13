import { useState } from "react";
import { Product } from "../model/model";

export const SelectFiltersButton = (
    products: Product[],
    productsPropertiesToMap: Product[]
) => {
    const [filteringProperty, setFilteringProperty] = useState<
        "" | keyof Product
    >("");

    const handleFilter = (filterProperty: string | number) => {
        // Check if the value is present in the object
        if (filterProperty === "") {
            return;
        }
        if (
            products.some((item) =>
                Object.values(item).includes(filterProperty)
            )
        ) {
            const filteredProducts = products.filter((item) =>
                Object.values(item).includes(filterProperty)
            );
            // setFiltered(filteredProducts);
            // setSorted([]);
        }
    };

    const handleFilterPropertyChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFilteringProperty(event.target.value as keyof Product);
    };

    return (
        <>
            <button onClick={() => handleFilter(filteringProperty)}>
                Filter by model:
            </button>
            <label></label>
            <label>
                <select
                    value={filteringProperty}
                    onChange={handleFilterPropertyChange}
                >
                    <option value="">-- Select Property --</option>
                    {productsPropertiesToMap.map((filteringProperty) => (
                        <option
                            key={filteringProperty}
                            value={filteringProperty}
                        >
                            {filteringProperty}
                        </option>
                    ))}
                </select>
            </label>
        </>
    );
};
