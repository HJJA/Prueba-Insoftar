const mongoose = require('mongoose')

const esquemapersonas = new mongoose.Schema({
    
   

    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    cedula: {
        type: Number,
        unique: true,
        required: true,
        
    },
    correo: {
        type: String,
        unique: true,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
})

const personas = mongoose.model("personas", esquemapersonas)

module.exports = personas