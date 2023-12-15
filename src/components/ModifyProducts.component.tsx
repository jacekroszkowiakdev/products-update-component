import React, { FormEvent } from "react";
import { useState } from "react";
import { Product } from "../model/model";
import { useLocation } from "react-router-dom";

export const ModifyProducts: React.FC = () => {
    const location = useLocation();
    const products: Product[] = location.state;
    const [newProduct, setNewProduct] = useState<Product | object>({});
    // const [formData, setFormData] = useState<FormData | object>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setFormData(new FormData(e.currentTarget));
        console.log("e.current target", e.currentTarget);
        const formData = new FormData(e.currentTarget);

        setNewProduct({
            id: products.length + 1,
            manufacturer: formData.get("manufacturer"),
            year: formData.get("year"),
            model: formData.get("model"),
        });
        console.log("newProduct: ", newProduct);
        console.log("formData: ", formData);

        fetch("https://localhost:3000/products", {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => {
                console.log(response.body);
                return response.json();
            })
            .catch((error) => console.error("Error posting data:", error));
    };

    return (
        <>
            <h3>Add New Product</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    required
                    type="text"
                    name="manufacturer"
                    placeholder=" manufacturer"
                />
                <input
                    required
                    type="text"
                    name="year"
                    placeholder="year of production"
                />
                <input required type="text" name="model" placeholder="model" />

                <button>Submit</button>
            </form>

            <h3>Modify or delete existing product</h3>
            <div className="products-container">
                {products.length !== 0 && (
                    <div>
                        {products.map((product) => (
                            <div key={product.id}>
                                <strong>{product.manufacturer}</strong> -{" "}
                                {product.model} ({product.year})
                                <button>delete</button>
                                <button>modify</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
