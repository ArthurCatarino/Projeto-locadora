function valida_Filmes(Nome, QuantidadeEmEstoque) {
  if (!Nome) {
    return "Nome nao foi preenchido corretamente";
  }
  if (!QuantidadeEmEstoque) {
    return "Quantidade em estoque nao foi preenchido corretamente";
  }
  if (typeof 0 != typeof QuantidadeEmEstoque) {
    return "O campo quantidade em estoque deve ser preenchido por um numero";
  }
}

module.exports = { valida_Filmes };
