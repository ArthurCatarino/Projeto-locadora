const db = require("../db");

async function buscarTodos() {
  return new Promise((aceito, rejeitado) => {
    const query = "select ID,Nome,Sobrenome,email from locadora_db.usuarios";
    db.query(query, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function buscaUnica(id) {
  return new Promise((aceito, rejeitado) => {
    const query = "select ID,Nome,Sobrenome,email from locadora_db.usuarios where ID=?;";
    db.query(query, id, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function buscaEmail(email) {
  return new Promise((aceito, rejeitado) => {
    const query = "select email  from locadora_db.usuarios where email=?";
    const emailBuscado = email;

    db.query(query, email, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function criarUsuario(nome, sobrenome, email, senha) {
  return new Promise((aceito, rejeitado) => {
    const query = "insert into locadora_db.usuarios (Nome,Sobrenome,email,senha) values (?,?,?,?)";
    const valores = [nome, sobrenome, email, senha];

    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function login(email) {
  return new Promise((aceito, rejeitado) => {
    const query = "select ID,email,senha from locadora_db.usuarios where email=?";
    db.query(query, email, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function atribuirCargo(id) {
  return new Promise((aceito, rejeitado) => {
    const query = "select * from locadora_db.cargosdeusuarios where Usuarios_ID=?";
    db.query(query, id, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

module.exports = { buscarTodos, buscaUnica, buscaEmail, criarUsuario, login, atribuirCargo };
