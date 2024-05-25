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

module.exports = { buscarTodos, buscaUnica };
