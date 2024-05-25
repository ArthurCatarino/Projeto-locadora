const services_Usuarios = require("../services/dbservices_Usuarios");

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

module.exports = { buscarTodos, buscaUnica };
