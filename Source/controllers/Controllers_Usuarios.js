const services_Usuarios = require("../services/dbservices_Usuarios");
const validações_Usuarios = require("../Validações/Validações_usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function buscarTodos(req, res) {
  try {
    let usuarios = await services_Usuarios.buscarTodos();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao consultar os dados", error);
    return res.status(500).json("Erro ao consultar os dados");
  }
}

async function buscaUnica(req, res) {
  try {
    let usuario = await services_Usuarios.buscaUnica(req.id);

    if (usuario.length === 0) {
      return res.status(404).json("Usuario nao encontrado");
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Erro ao buscar usuario");
  }
}

async function criarUsuario(req, res) {
  let { nome, sobrenome, email, senha } = req.body;

  let valida = validações_Usuarios.validações_Registrar(nome, sobrenome, email, senha);
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
    return res.status(500).json("Erro ao adicionar dados");
  }
  return res.status(200).json(`Usuario ${nome} adicionado com sucesso`);
}

async function login(req, res) {
  let { email, senha } = req.body;

  let valida = validações_Usuarios.validações_Login(email, senha);
  if (valida) {
    return res.status(400).json(valida);
  }

  try {
    let confereLogin = await services_Usuarios.login(email);
    if (confereLogin.length === 0) {
      return res.status(403).json("Email inexistente");
    }
    let comparasenhas = await bcrypt.compare(senha, confereLogin[0].senha);
    if (!comparasenhas) {
      return res.status(403).json("Senha incorreta");
    }

    const user_secret = process.env.USER_SECRET;
    const admin_secret = process.env.ADMIN_SECRET;

    let atribuirCargo = await services_Usuarios.atribuirCargo(confereLogin[0].ID);

    if (atribuirCargo[0].Cargos_ID == 1) {
      const token = jwt.sign({ id: atribuirCargo[0].Usuarios_ID, nome: confereLogin[0].Nome }, user_secret, {
        expiresIn: "1h",
      });
      return res.status(200).json({ msg: "Usuario autenticado com sucesso", token });
    }
    if (atribuirCargo[0].Cargos_ID == 2) {
      const token = jwt.sign({ id: atribuirCargo[0].Usuarios_ID, nome: confereLogin[0].Nome }, admin_secret, {
        expiresIn: "1h",
      });
      return res.status(200).json({ msg: "Admin autenticado com sucesso", token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Algo deu errado durante a autenticação");
  }
}

module.exports = { buscarTodos, buscaUnica, criarUsuario, login };
