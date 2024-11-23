import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
