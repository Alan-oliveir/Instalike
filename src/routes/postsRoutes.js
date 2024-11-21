import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });

// Define as rotas usando o objeto Express app
const routes = (app) => {
  app.use(express.json());

  // Rota para recuperar uma lista de todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;
