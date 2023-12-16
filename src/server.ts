import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/products", (_req: Request, res: Response) => {
    try {
        // Read products from the JSON file
        const productsRawData = fs.readFileSync("./db/db.json", "utf-8");
        const products = JSON.parse(productsRawData);
        console.log("Products served: ", products);

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// const router = express.Router();

// router.get("/api/items", (req, res) => {
//     fs.readFile("./data/db.json", (err, json) => {
//         const obj = JSON.parse(json);
//         res.json(obj);
//     });
// });

// Define the path to the local db.json file
// const dbPath = path.join(__dirname, "db", "db.json");

// // Read data from db.json
// function readData(): any[] {
//     const data = fs.readFileSync(dbPath, "utf8");
//     console.log(data);
//     return JSON.parse(data);
// }

// // Write data to db.json
// function writeData(data: any[]): void {
//     fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
// }

// // GET endpoint to retrieve all items
// app.get("/api/items", (_req: Request, res: Response) => {
//     const data = readData();
//     res.json(data);
// });

// // POST endpoint to add a new item
// app.post("/api/items", (req: Request, res: Response) => {
//     const data = readData();
//     const newItem = req.body;

//     if (!newItem || typeof newItem !== "object") {
//         return res.status(400).json({ error: "Invalid data format" });
//     }

//     data.push(newItem);

//     writeData(data);
//     res.json(newItem);
// });

// PUT endpoint to update an item by ID
// app.put("/api/items/:id", (req: Request, res: Response) => {
//     const data = readData();
//     const itemId = req.params.id;
//     const updatedItem = req.body;

//     if (!updatedItem || typeof updatedItem !== "object") {
//         return res.status(400).json({ error: "Invalid data format" });
//     }

//     const index = data.findIndex((item: any) => item.id === itemId);

//     if (index !== -1) {
//         data[index] = { ...data[index], ...updatedItem };
//         writeData(data);
//         res.json(data[index]);
//     } else {
//         res.status(404).json({ error: "Item not found" });
//     }
// });

// DELETE endpoint to delete an item by ID
// app.delete("/api/items/:id", (req: Request, res: Response) => {
//     const data = readData();
//     const itemId = req.params.id;

//     const index = data.findIndex((item: any) => item.id === itemId);

//     if (index !== -1) {
//         const deletedItem = data.splice(index, 1)[0];
//         writeData(data);
//         res.json(deletedItem);
//     } else {
//         res.status(404).json({ error: "Item not found" });
//     }
// });
