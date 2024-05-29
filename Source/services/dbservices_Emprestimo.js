const db = require("../db");

async function fazerEmprestimo(filme_ID, usuario_ID) {
  return new Promise((aceito, rejeitado) => {
    const query = "insert into locadora_db.emprestimos (ID_FILME,ID_USER) values (?,?)";
    const valores = [filme_ID, usuario_ID];
    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function validacao(filme_ID, usuario_ID) {
  return new Promise((aceito, rejeitado) => {
    const query = "select ID_USER,ID_FILME from locadora_db.emprestimos where ID_FILME = ? and ID_USER = ?";
    const valores = [filme_ID, usuario_ID];
    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function verEmprestimos(usuario_ID) {
  return new Promise((aceito, rejeitado) => {
    const query = "select * from locadora_db.emprestimos where ID_USER = ?";
    db.query(query, usuario_ID, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function devolucao(filme, usuario) {
  return new Promise((aceito, rejeitado) => {
    const query = "DELETE FROM locadora_db.emprestimos WHERE ID_USER=? AND ID_FILME=?;";
    const valores = [filme, usuario];
    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

module.exports = { fazerEmprestimo, validacao, verEmprestimos, devolucao };
