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

async function adicionaAdmin(req, res) {
  const id = req.params.id;
  try {
    const valida = await services_Usuarios.atribuirCargo(id); //Retorna qual o cargo do usuario, se o usuario nao tiver cargo e porque nao

    if (valida.length === 0) {
      return res.status(400).json("Usuario nao existe");
    }

    if (valida[0].Cargos_ID === 2) {
      return res.status(400).json("O usuario ja e um admin");
    }
    const nome = await services_Usuarios.buscaNome(id);
    await services_Usuarios.adicionaAdmin(id);
    return res.status(200).json(`Usuario ${nome[0].Nome} adicionado como admin`);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Erro ao adicionar usuario");
  }
}

async function deletaAdmin(req, res) {
  id = req.params.id;
  if (id == req.id) {
    return res.status(400).json("Voce nao pode tirar o seu proprio cargo");
  }

  const valida = await services_Usuarios.atribuirCargo(id); //Retorna qual o cargo do usuario, se o usuario nao tiver cargo e porque nao existe

  if (valida.length === 0) {
    return res.status(400).json("Usuario nao existe");
  }
  if (valida[0].Cargos_ID === 1) {
    return res.status(400).json("O usuario nao e um admin");
  }
  const nome = await services_Usuarios.buscaNome(id);
  await services_Usuarios.deletaAdmin(id);
  return res.status(200).json(`Removida as permissoes de admin do usuario ${nome[0].Nome} `);
}

module.exports = { buscarTodos, buscaUnica, criarUsuario, login, adicionaAdmin, deletaAdmin };
