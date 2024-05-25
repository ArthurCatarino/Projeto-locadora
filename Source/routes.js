const express = require("express");
const router = express.Router();
const controller = require("./controllers/controllers");

router.get("/filmes", controller.buscarTodos);
router.get("/filmes/:id", controller.buscaUnica);
router.post("/filmes", controller.adicionarFilme);
router.put("/filmes/:id", controller.atualizaFilme);
router.delete("/filmes/:id", controller.apagarFilme);

module.exports = router;
