const db = require("../db");

async function mudarSenha(senha, email) {
  return new Promise((aceito, rejeitado) => {
    const query = "UPDATE locadora_db.usuarios SET senha=? WHERE email=?";
    const valores = [senha, email];
    db.query(query, valores, (error, results) => {
      if (error) {
        rejeitado(error);
        return;
      }
      aceito(results);
    });
  });
}

module.exports = { mudarSenha };
