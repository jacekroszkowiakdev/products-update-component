import "./App.css";
import React, { useEffect, useState } from "react";
import { ProductList } from "./components/ProductsList.component";
// import data from "./db/db.json";
import { Product } from "./model/model";
import { Link } from "react-router-dom";

const App: React.FC = () => {
    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/posts", {
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Failed to post data");
    //             }
    //             return response.json();
    //         })
    //         .catch((error) => console.error("Error posting data:", error));
    // }, []);

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Resp: ", data), setProducts(data);
            });
    }, []);

    console.log("Products", products);

    return (
        <>
            <h2>Click the button to see the products</h2>
            {products.length !== 0 && (
                <div>
                    <ProductList products={products} />
                    <Link to="/modify-products" state={products}>
                        Modify Products
                    </Link>
                </div>
            )}
        </>
    );
};

export default App;
