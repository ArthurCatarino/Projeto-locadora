const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const services_Usuarios = require("../services/dbservices_Usuarios");
const services_recuperarSenha = require("../services/dbservices_RecuperaSenha");
const contatador = "adan62@ethereal.email";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "sadye.wehner83@ethereal.email",
    pass: "QmYDpxZG98FcectzyQ",
  },
});
async function enviaEmail(email) {
  const token = await jwt.sign({ email: email }, process.env.RECUPERAR_SENHA, { expiresIn: "1h" });
  await transporter.sendMail({
    from: contatador,
    to: email,
    subject: "Recuperação de senha",
    text: `Recuperar a senha, token para recuperar a senha: ${token}`,
    html: `<p>Recuperar a senha, token para recuperar a senha: ${token} <p>`,
  });
}

async function recuperarSenha(req, res) {
  const { email } = req.body;

  if (!email) res.status(400).json("Email nao foi inserio");

  const validaEmail = await services_Usuarios.buscaEmail(email); //Verifica se o email existe;
  if (validaEmail.length === 0) return res.status(400).json("Este email nao existe");

  enviaEmail(email);

  return res.status(200).json(`Token para mudança de senha enviada no email: ${email}`);
}

async function mudarSenha(req, res) {
  const { token, novaSenha } = req.body;
  let email;

  if (!token) {
    return res.status(400).json("Por favor insira o token");
  }
  if (!novaSenha) {
    return res.status(400).json("Nenhuma senha inserida");
  }

  jwt.verify(token, process.env.RECUPERAR_SENHA, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json("Token invalido");
    }
    email = results.email;
  });

  try {
    const salt = bcrypt.genSaltSync(8);
    const senha = bcrypt.hashSync(novaSenha, salt);
    await services_recuperarSenha.mudarSenha(senha, email);
    res.status(200).json("Senha trocada com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Algo deu errado na troca de senhas");
  }
}

module.exports = { recuperarSenha, mudarSenha };
