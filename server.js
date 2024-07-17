import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

const apiKey = "0521fda79d90ef7c820dcabfeab0a14c";
const password = "f43a8e23b1d9f8760ef4d98634a34f0d";
const shopName = "e9714c-70.myshopify.com";

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(
      `https://${apiKey}:${password}@${shopName}.myshopify.com/admin/api/2023-04/products.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
