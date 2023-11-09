import express from "express";
import cors from "cors";
import rootRoute from "./routes/rootRoute.js";
import config from "./config/config.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(rootRoute);

app.listen(config.db_port, () => {
  console.log(config.db_port);
  console.log("Connect successfully");
});
