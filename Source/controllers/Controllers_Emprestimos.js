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

module.exports = { fazerEmprestimo };
