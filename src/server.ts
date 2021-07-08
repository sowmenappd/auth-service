import dotenv from "dotenv";
import express from "express";

import authRoutes from "./express/routes/auth";

const envPath = `./src/.env.${process.env.NODE_ENV}`.concat(
  process.env.LOCAL ? ".local" : ""
);
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3000;
// console.log("PORT", process.env.PORT);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(Number(PORT), () => {
  console.log(`Server started listening at PORT: ${PORT}`);
});
