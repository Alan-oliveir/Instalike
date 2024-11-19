import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placekitten.com/200/300",
  },
  {
    id: 2,
    descricao: "Gato fofo dormindo",
    imagem: "https://placekitten.com/300/200",
  },
  {
    id: 3,
    descricao: "Paisagem incrível",
    imagem: "https://placekitten.com/400/300",
  },
  {
    id: 4,
    descricao: "Cachorro brincando",
    imagem: "https://placekitten.com/200/400",
  },
  {
    id: 5,
    descricao: "Comida deliciosa",
    imagem: "https://placekitten.com/300/300",
  },
  {
    id: 6,
    descricao: "Bebê sorrindo",
    imagem: "https://placekitten.com/200/200",
  },
];

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

function getPostById(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const index = getPostById(req.params.id);
  res.status(200).json(posts[index]);
});
