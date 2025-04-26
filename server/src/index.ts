import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
