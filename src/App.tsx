import "./App.css";
import React, { useEffect, useState } from "react";
import { ProductList } from "./components/ProductsList.component";
import data from "./db/db.json";
import { Product } from "./model/model";

const App: React.FC = () => {
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to post data");
                }
                return response.json();
            })
            .catch((error) => console.error("Error posting data:", error));
    }, []);

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((json) => {
                setProducts(json);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            <h2>Click the button to see the products</h2>
            <ProductList products={products} />
        </>
    );
};

export default App;
