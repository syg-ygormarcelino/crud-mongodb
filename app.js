const express = require("express")
const cors = require("cors")
const app = express()
const routes = require('express').Router()
const { Usuarios: UsuariosModel } = require("./models/Usuarios")

app.use(cors())

app.use(express.json())

const conn = require('./db/conn')

conn()

app.use(routes)

app.post('/autenticacao/entrar', async (req, res) => {

    let usuario = await UsuariosModel.where({ email: req.body.email }).findOne();

    if (!usuario) {
        return res.json("E-Mail não encontrado")
    }

    usuario = await UsuariosModel.where({ email: req.body.email, senha: req.body.senha }).findOne();

    if (!usuario) {
        return res.json("Senha incorreta")
    }

    return res.json('Logado com sucesso')
})

app.post('/autenticacao/registrar', async (req, res) => {

    const usuario = await UsuariosModel.where({ email: req.body.email }).findOne();

    if (usuario) {
        return res.json("Usuário já cadastrado")
    }

    return res.json(await UsuariosModel.create(req.body))

})

app.get('/perfil/:idUsuario', async (req, res) => {

    const usuario = await UsuariosModel.where({ _id: req.params.idUsuario }).findOne();

    return res.json(usuario)

})

app.patch('/perfil/senha/alterar/:idUsuario', async (req, res) => {

    let usuario = UsuariosModel.where({ _id: req.params.idUsuario }).findOne();

    if (!usuario) {
        return res.json("Usuário não cadastrado")
    }

    usuario = await UsuariosModel.where({ _id: req.params.idUsuario, senha: req.body.senhaAtual }).findOne();

    if (!usuario) {
        return res.json("Senha atual incorreta")
    }
 
    usuario = await UsuariosModel.updateOne({ _id: req.params.idUsuario }, { senha: req.body.novaSenha }, {
        new: true
    })

    if (usuario.modifiedCount === 1) {
        return res.json("Modificado com sucesso")
    }

})

app.listen(3000, function () {
    console.log("Servidor online")
})