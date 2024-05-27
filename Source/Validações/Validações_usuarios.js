function validações_Registrar(nome, sobrenome, email, senha) {
  if (!nome) {
    return "Nome nao preenchido corretamente";
  }
  if (!sobrenome) {
    return "Sobrenome nao preenchido corretamente";
  }
  if (!email) {
    return "Email nao preenchido corretamente";
  }
  if (!senha) {
    return "Senha nao preenchida corretamente";
  }
}

function validações_Login(email, senha) {
  if (!email) {
    return "Email nao preenchido corretamente";
  }
  if (!senha) {
    return "Senha nao preenchida corretamente";
  }
}

module.exports = { validações_Registrar, validações_Login };
