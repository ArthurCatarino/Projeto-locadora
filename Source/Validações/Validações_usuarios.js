function validações_Login(nome, sobrenome, email, senha) {
  if (!nome) {
    return "Nome nao preenchida corretamente";
  }
  if (!sobrenome) {
    return "Sobrenome nao preenchida corretamente";
  }
  if (!email) {
    return "Email nao preenchida corretamente";
  }
  if (!senha) {
    return "Senha nao preenchida corretamente";
  }
}

module.exports = { validações_Login };
