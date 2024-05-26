const services_Usuarios = require("../services/dbservices_Usuarios");
const validações_Usuarios = require("../Validações/Validações_usuarios");
const bcrypt = require("bcrypt");

async function buscarTodos(req, res) {
  try {
    let usuarios = await services_Usuarios.buscarTodos();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao consultar os dados", error);
    res.status(500).json("Erro ao consultar os dados");
  }
}

async function buscaUnica(req, res) {
  try {
    let usuario = await services_Usuarios.buscaUnica(req.params.id);

    if (usuario.length === 0) {
      return res.status(404).json("Usuario nao encontrado");
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erro ao buscar usuario");
  }
}

async function criarUsuario(req, res) {
  let { nome, sobrenome, email, senha } = req.body;

  let valida = validações_Usuarios.validações_Login(nome, sobrenome, email, senha);
  if (valida) {
    return res.status(400).json(valida);
  }

  let verificaEmail = await services_Usuarios.buscaEmail(email);
  if (verificaEmail.length > 0) {
    return res.status(400).json("Esse email ja existe");
  }

  let salt = bcrypt.genSaltSync(8);
  let senhaCriptografada = bcrypt.hashSync(senha, salt);

  try {
    await services_Usuarios.criarUsuario(nome, sobrenome, email, senhaCriptografada);
  } catch (error) {
    console.error("Erro ao adicionar dados", error);
    res.status(500).json("Erro ao adicionar dados");
  }
  res.status(200).json(`Usuario ${nome} adicionado com sucesso`);
}

module.exports = { buscarTodos, buscaUnica, criarUsuario };
