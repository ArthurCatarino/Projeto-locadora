const services_Emprestimo = require("../services/dbservices_Emprestimo");

async function fazerEmprestimo(req, res) {
  const filme_ID = req.params.id;
  const usuario_ID = req.id;
  try {
    const validacao = await services_Emprestimo.validacao(filme_ID, usuario_ID);
    if (validacao.length > 0) {
      return res.status(400).json("Voce ja esta com este filme emprestado");
    }

    await services_Emprestimo.fazerEmprestimo(filme_ID, usuario_ID);
    return res.status(200).json("Emprestimo feito com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Ocorreu um erro ao realizar o emprestimo, contate um admin");
  }
}

async function verEmprestimos(req, res) {
  const ID_USER = req.id;
  try {
    const emprestimos = await services_Emprestimo.verEmprestimos(ID_USER);
    if (emprestimos.length === 0) {
      res.status(200).json("Voce nao possui nenhum emprestimo ativo");
    }
    res.status(200).json(emprestimos);
  } catch (error) {
    console.error(error);
    res.status(500).json("Erro ao consultar banco de dados");
  }
}

async function devolucao(req, res) {
  const filme_ID = req.params.filme;
  const usuario_ID = req.params.usuario;
  try {
    const valida = await services_Emprestimo.validacao(filme_ID, usuario_ID);
    console.log(valida);
    if (valida.length === 0) {
      return res.status(400).json("Este usuario nao tem esse filme emprestado");
    }
    await services_Emprestimo.devolucao(filme_ID, usuario_ID);
    return res.status(200).json("Devolucao feita com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Erro ao deletar emprestimo");
  }
}

module.exports = { fazerEmprestimo, verEmprestimos, devolucao };
