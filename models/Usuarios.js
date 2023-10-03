const mongoose = require("mongoose")

const { Schema } = mongoose

const usuariosSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    contato: {
        whatsapp: {
            type: String,
            required: true
        }
    },


}, { timestamps: true })

const Usuarios = mongoose.model("Usuarios",usuariosSchema)

module.exports = {
    Usuarios,
    usuariosSchema
}