import express from "express";

const app = express();
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

app.get("/api", (req, res) => {
  res.status(200).send("Hello from server!");
});
