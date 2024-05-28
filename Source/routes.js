const express = require("express");
const router = express.Router();
const controller_Filmes = require("./controllers/Controllers_Filmes");
const controller_Usuarios = require("./controllers/Controllers_Usuarios");
const middleware = require("./Middlewares/middlewares");

//Rotas do CRUD dos filmes
router.get("/filmes", controller_Filmes.buscarTodos);
router.get("/filmes/:id", controller_Filmes.buscaUnica);
router.post("/filmes", controller_Filmes.adicionarFilme);
router.put("/filmes/:id", controller_Filmes.atualizaFilme);
router.delete("/filmes/:id", controller_Filmes.apagarFilme);

//Rotas do CRUD dos usuarios
router.get("/users", controller_Usuarios.buscarTodos);
router.get("/users/perfil", middleware.confereAutorização, controller_Usuarios.buscaUnica);
router.post("/user/registrar", controller_Usuarios.criarUsuario);
router.post("/login", controller_Usuarios.login);

module.exports = router;
