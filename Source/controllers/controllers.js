const services = require("../services/dbservices");

async function buscarTodos(req, res) {
  try {
    let filmes = await services.buscarTodos();
    res.status(200).json(filmes);
  } catch (error) {
    console.error("Erro ao listar filmes :", error);
    res.status(500).json("Erro ao listar filmes");
  }
}

async function buscaUnica(req, res) {
  try {
    let filme = await services.buscaUnica(req.params.id);
    if (filme.length === 0) {
      res.status(404).json("Filme nao encontrado");
      return;
    }
    res.status(200).json(filme);
  } catch (error) {
    console.error("Erro ao listar filmes :", error);
    res.status(500).json("Erro ao listar filmes");
  }
}

async function atualizaFilme(req, res) {
  let filme = await services.buscaUnica(req.params.id);
  if (filme.length === 0) {
    return res.status(404).json("Filme nao encontrado");
  }

  const { Nome, Diretor, QuantidadeEmEstoque, Estudio } = req.body;

  if (!Nome) return res.status(422).json("Nome nao foi preenchido corretamente");

  if (!QuantidadeEmEstoque) {
    return res.status(422).json("Quantidade em estoque nao foi preenchido corretamente");
  }
  if (typeof 0 != typeof QuantidadeEmEstoque) {
    return res.status(422).json("O campo quantidade em estoque deve ser preenchido por um numero");
  }

  try {
    await services.atualizaFilme(Nome, Diretor, QuantidadeEmEstoque, Estudio, req.params.id);
    return res.json(`Filme ${filme[0].Nome} atualizado para ${Nome}`);
  } catch (error) {
    console.error("Erro ao atualizar filme", error);
    res.status(500).json({ error: "Erro ao atualizar filme :( " });
  }
}

async function adicionarFilme(req, res) {
  let { Nome, Diretor, QuantidadeEmEstoque, Estudio } = req.body;

  if (!Nome) return res.status(422).json("Nome nao foi preenchido corretamente");

  if (!QuantidadeEmEstoque) {
    return res.status(422).json("Quantidade em estoque nao foi preenchido corretamente");
  }
  if (typeof 0 != typeof QuantidadeEmEstoque) {
    return res.status(422).json("O campo quantidade em estoque deve ser preenchido por um numero");
  }

  try {
    await services.adicionarFilme(Nome, Diretor, QuantidadeEmEstoque, Estudio);
    res.status(200).json(`Filme : ${Nome} adicionado com sucesso`);
  } catch (error) {
    console.error("Erro ao adicionar filme", error);
    res.status(500).json("Erro ao adicionar filme");
  }
}

async function apagarFilme(req, res) {
  try {
    let filme = await services.buscaUnica(req.params.id);
    if (filme.length === 0) {
      return res.status(404).json("Filme nao encontrado");
    }
    await services.apagarFilme(req.params.id);
    res.status(200).json(`Filme: ${filme[0].Nome} apagado com sucesso`);
  } catch (error) {
    console.error("Erro ao apagar filme :", error);
    res.status(500).json("Erro ao apagar filme");
  }
}

module.exports = {
  buscarTodos,
  buscaUnica,
  atualizaFilme,
  adicionarFilme,
  apagarFilme,
};
