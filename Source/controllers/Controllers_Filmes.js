const services_Filmes = require("../services/dbservices_Filmes");
const valida_filmes = require("../Validações/Validações_filmes");

async function buscarTodos(req, res) {
  try {
    let filmes = await services_Filmes.buscarTodos();
    return res.status(200).json(filmes);
  } catch (error) {
    console.error("Erro ao listar filmes :", error);
    return res.status(500).json("Erro ao listar filmes");
  }
}

async function buscaUnica(req, res) {
  try {
    let filme = await services_Filmes.buscaUnica(req.params.id);
    if (filme.length === 0) {
      return res.status(404).json("Filme nao encontrado");
    }
    res.status(200).json(filme);
  } catch (error) {
    console.error("Erro ao listar filmes :", error);
    return res.status(500).json("Erro ao listar filmes");
  }
}

async function atualizaFilme(req, res) {
  let filme = await services_Filmes.buscaUnica(req.params.id);
  if (filme.length === 0) {
    return res.status(404).json("Filme nao encontrado");
  }

  const { Nome, Diretor, QuantidadeEmEstoque, Estudio } = req.body;
  const valida = valida_filmes.valida_Filmes(Nome, QuantidadeEmEstoque);
  if (valida) {
    return res.status(400).json(valida);
  }

  try {
    await services_Filmes.atualizaFilme(Nome, Diretor, QuantidadeEmEstoque, Estudio, req.params.id);
    return res.json(`Filme ${filme[0].Nome} atualizado para ${Nome}`);
  } catch (error) {
    console.error("Erro ao atualizar filme", error);
    return res.status(500).json({ error: "Erro ao atualizar filme :( " });
  }
}

async function adicionarFilme(req, res) {
  let { Nome, Diretor, QuantidadeEmEstoque, Estudio } = req.body;

  const valida = valida_filmes.valida_Filmes(Nome, QuantidadeEmEstoque);
  if (valida) {
    return res.status(400).json(valida);
  }

  try {
    await services_Filmes.adicionarFilme(Nome, Diretor, QuantidadeEmEstoque, Estudio);
    return res.status(200).json(`Filme : ${Nome} adicionado com sucesso`);
  } catch (error) {
    console.error("Erro ao adicionar filme", error);
    return res.status(500).json("Erro ao adicionar filme");
  }
}

async function apagarFilme(req, res) {
  try {
    let filme = await services_Filmes.buscaUnica(req.params.id);
    if (filme.length === 0) {
      return res.status(404).json("Filme nao encontrado");
    }
    await services_Filmes.apagarFilme(req.params.id);
    return res.status(200).json(`Filme: ${filme[0].Nome} apagado com sucesso`);
  } catch (error) {
    console.error("Erro ao apagar filme :", error);
    return res.status(500).json("Erro ao apagar filme");
  }
}

module.exports = {
  buscarTodos,
  buscaUnica,
  atualizaFilme,
  adicionarFilme,
  apagarFilme,
};
