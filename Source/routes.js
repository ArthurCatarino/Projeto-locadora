const express = require("express");
const router = express.Router();
const controller_Filmes = require("./controllers/Controllers_Filmes");
const controller_Usuarios = require("./controllers/Controllers_Usuarios");
const controller_Emprestimo = require("./controllers/Controllers_Emprestimos");
const controller_Email = require("./controllers/Controllers_EnviaEmail");
const middleware = require("./Middlewares/middlewares");

//Rotas do CRUD dos filmes
router.get("/filmes", controller_Filmes.buscarTodos);
router.get("/filmes/:id", controller_Filmes.buscaUnica);
router.post("/filmes", middleware.autorizaAdmin, controller_Filmes.adicionarFilme);
router.put("/filmes/:id", middleware.autorizaAdmin, controller_Filmes.atualizaFilme);
router.delete("/filmes/:id", middleware.autorizaAdmin, controller_Filmes.apagarFilme);

//Rotas relacionadas a usuarios
router.get("/users", middleware.autorizaAdmin, controller_Usuarios.buscarTodos);
router.get("/users/perfil", middleware.confereAutorização, controller_Usuarios.buscaUnica);
router.post("/user/registrar", controller_Usuarios.criarUsuario);
router.post("/login", controller_Usuarios.login);

//Rotas relacionadas a adicionar ou remover admins
router.put("/adicionaAdmin/:id", middleware.autorizaAdmin, controller_Usuarios.adicionaAdmin);
router.put("/deletaAdmin/:id", middleware.autorizaAdmin, controller_Usuarios.deletaAdmin);
router.get("/admins", middleware.autorizaAdmin, controller_Usuarios.listaAdmin);

//Rotas relacionadas a emprestimos
router.post("/emprestimo/:id", middleware.confereAutorização, controller_Emprestimo.fazerEmprestimo);
router.get("/emprestimo", middleware.confereAutorização, controller_Emprestimo.verEmprestimos);
router.delete("/devolucao/:filme/:usuario", middleware.autorizaAdmin, controller_Emprestimo.devolucao);

//Recuperar senha
router.post("/recuperar-senha", controller_Email.recuperarSenha);

module.exports = router;
