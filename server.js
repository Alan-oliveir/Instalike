import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();

// Serve uploaded images
app.use(express.static("uploads"));

// Serve frontend static files
app.use(express.static("frontend"));

// API routes
routes(app);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
  console.log("Frontend available at: http://localhost:4000");
  console.log("API endpoints at: http://localhost:4000/posts");
});
