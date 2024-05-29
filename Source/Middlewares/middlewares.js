const jwt = require("jsonwebtoken");

function confereAutorização(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(401).json("Autenticação necessaria");
  }

  jwt.verify(token, process.env.USER_SECRET, (erro, results) => {
    if (erro) {
      //Se o secret de usuario nao for valido ele tenta usar o secret de admin
      jwt.verify(token, process.env.ADMIN_SECRET, (error, results) => {
        if (error) {
          return res.status(401).json("Autenticação invadila");
        }

        req.id = results.id;
        req.nome = results.nome;
        return next();
      });
    } else {
      req.id = results.id;
      req.nome = results.nome;
      return next();
    }
  });
}

function autorizaAdmin(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(401).json("Autenticação necessaria");
  }

  jwt.verify(token, process.env.ADMIN_SECRET, (error, results) => {
    if (error) {
      return res.status(403).json("Disponivel apenas para admins");
    }
    req.id = results.id;
    return next();
  });
}

module.exports = { confereAutorização, autorizaAdmin };
