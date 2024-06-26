﻿# Projeto-Locadora

## Visao geral

Este projeto tem como finalidade ser um sistema para emprestimos de filmes, onde se pode gerenciar todo o estoque, cadastrar usuarios e criar relações de clientes com seus devidos emprestimos

## Dependencias

### Node.js

Usado para criar e manter o servidor online.

### Express

Usado principalmente para agilizar o desenvolvimento web, sendo util na criação de rotas e leitura de JSON

### Bcrypt

Usado para cryptografar senhas e gerar salt para elas contrubuindo para a segurança do usuario

### Jsonwebtoken

Usado para gerar e decifrar tokens, controlando o acesso a rotas privada e sistemas de recuperação de senha

### Nodemailer

Usado para enviar emails no sistema de recuperação de senha

### Mysql2

Usado para fazer a conexao da aplicação e o banco de dados

## Banco de dados

O banco de dados escolhido foi o MySQL, um banco relacional foi priorizado nesse projeto pois a consistencia dos dados era muito importante, principalmente na parte de gerenciamento de estoque e nas relações entre filme emprestado e usuario que o pegou emprestado.

Para criar uma replica do banco de dados basta executar o arquivo <a href=“https://github.com/ArthurCatarino/Projeto-locadora/blob/main/Script.sql“>script.sql</a>.

# Documentações

## Banco de dados: https://docs.google.com/document/d/1PjS3HYjQ2lPeQ6kDr5auq2lSwlDI7-6xr-nb1uoqIjU/edit?usp=sharing

## Documentação da aplicação: https://docs.google.com/document/d/1VXxxLDz24a38WuXGmerdvZz4ZB-Xl1EnvgZlyECl0IY/edit?usp=sharing
