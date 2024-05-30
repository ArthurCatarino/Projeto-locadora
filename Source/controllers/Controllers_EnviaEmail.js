const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const services_Usuarios = require("../services/dbservices_Usuarios");
const contatador = "adan62@ethereal.email";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: contatador,
    pass: "k1Z4Ne3DdqSZzW3QXx",
  },
});

async function enviaEmail(email) {
  const token = await jwt.sign(process.env.RECUPERAR_SENHA, "10m");
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

module.exports = { recuperarSenha };
