const db = require("../db");

async function buscarTodos() {
  return new Promise((aceito, rejeitado) => {
    const query = "SELECT * FROM locadora_db.filmes where QuantidadeEmEstoque>0";
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
    const query = "SELECT * FROM locadora_db.filmes WHERE ID=? and QuantidadeEmEstoque>0;";
    db.query(query, id, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function atualizaFilme(Nome, Diretor, QuantidadeEmEstoque, Estudio, id) {
  return new Promise((aceito, rejeitado) => {
    const query = "UPDATE locadora_db.filmes SET Nome=?,Diretor=?, QuantidadeEmEstoque=?, Estudio=? WHERE ID=?";
    const valores = [Nome, Diretor, QuantidadeEmEstoque, Estudio, id];

    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function adicionarFilme(Nome, Diretor, QuantidadeEmEstoque, Estudio) {
  return new Promise((aceito, rejeitado) => {
    const query = "INSERT INTO locadora_db.filmes (Nome, Diretor, QuantidadeEmEstoque, Estudio) VALUES(?,?,?,?)";
    const valores = [Nome, Diretor, QuantidadeEmEstoque, Estudio];

    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

async function apagarFilme(id) {
  return new Promise((aceito, rejeitado) => {
    const query = "DELETE FROM locadora_db.filmes WHERE ID=?";
    const ID = id;
    db.query(query, ID, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

module.exports = {
  buscarTodos,
  buscaUnica,
  atualizaFilme,
  adicionarFilme,
  apagarFilme,
};
