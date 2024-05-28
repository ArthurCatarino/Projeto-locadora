const express = require("express");
const router = express.Router();
const controller_Filmes = require("./controllers/Controllers_Filmes");
const controller_Usuarios = require("./controllers/Controllers_Usuarios");
const controller_emprestimo = require("./controllers/Controllers_Emprestimos");
const middleware = require("./Middlewares/middlewares");

//Rotas do CRUD dos filmes
router.get("/filmes", controller_Filmes.buscarTodos);
router.get("/filmes/:id", controller_Filmes.buscaUnica);
router.post("/filmes", middleware.autorizaAdmin, controller_Filmes.adicionarFilme);
router.put("/filmes/:id", middleware.autorizaAdmin, controller_Filmes.atualizaFilme);
router.delete("/filmes/:id", middleware.autorizaAdmin, controller_Filmes.apagarFilme);

router.post("/emprestimo/:id", middleware.confereAutorização, controller_emprestimo.fazerEmprestimo);

//Rotas relacionadas a usuarios
router.get("/users", middleware.autorizaAdmin, controller_Usuarios.buscarTodos);
router.get("/users/perfil", middleware.confereAutorização, controller_Usuarios.buscaUnica);
router.post("/user/registrar", controller_Usuarios.criarUsuario);
router.post("/login", controller_Usuarios.login);

module.exports = router;
