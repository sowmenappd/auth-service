import express from "express";
import authRoutes from "./express/routes/auth";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(Number(PORT), () => {
  console.log(`Server started listening at PORT: ${PORT}`);
});
