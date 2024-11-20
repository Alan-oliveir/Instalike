import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

async function getTodosPosts() {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

app.get("/posts", async (req, res) => {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
});

function getPostById(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = getPostById(req.params.id);
  res.status(200).json(posts[index]);
});
