const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { findOneAndRemove } = require('./modelos/personas')
const app = express()
const ModeloPersonas = require('./modelos/personas')

app.use(express.json())
app.use(cors());

//conexion BD
mongoose.connect('mongodb://localhost/Usuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

})


//añadir en base de datos
app.post('/insert', async (req, res) => {

    try {
        const nombres = req.body.nombres
        const apellidos = req.body.apellidos
        const cedula = req.body.cedula
        const correo = req.body.correo
        const telefono = req.body.telefono

        const personas = new ModeloPersonas();
        personas.nombres = nombres;
        personas.apellidos = apellidos;
        personas.cedula = cedula;
        personas.correo = correo;
        personas.telefono = telefono;
        await personas.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
        res.send(err)
    }
});

//extraer datos de base de datos
app.get('/users', async (req, res) => {
    ModeloPersonas.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }

        res.send(result)
    })
});


//actuaiza base de datos
app.post('/nombres', async (req, res) => {

    try {
        const id = req.body.id
        const newNombres = req.body.newNombres
        await ModeloPersonas.findById(id, (err, actualizarDatos) => {
            actualizarDatos.nombres = newNombres
            actualizarDatos.save();
            res.send("update");
        })
    } catch (err) {
        console.log(err);
    }

});

app.post('/apellidos', async (req, res) => {

    try {
        const id = req.body.id
        const newApellidos = req.body.newApellidos
        await ModeloPersonas.findById(id, (err, actualizarDatos) => {
            actualizarDatos.apellidos = newApellidos
            actualizarDatos.save();
            res.send("update");
        })
    } catch (err) {
        console.log(err);
    }
});

app.post('/cedula', async (req, res) => {

    try {
        const id = req.body.id
        const newCedula = req.body.newCedula
        await ModeloPersonas.findById(id, (err, actualizarDatos) => {
            actualizarDatos.cedula = newCedula
            actualizarDatos.save();
            res.send("update");
        })
    } catch (err) {
        console.log(err);
    }

});

app.post('/correo', async (req, res) => {

    try {
        const id = req.body.id
        const newCorreo = req.body.newCorreo
        await ModeloPersonas.findById(id, (err, actualizarDatos) => {
            actualizarDatos.correo = newCorreo
            actualizarDatos.save();
            res.send("update");
        })
    } catch (err) {
        console.log(err);
    }

});

app.post('/telefono', async (req, res) => {

    try {
        const id = req.body.id
        const newTelefono = req.body.newTelefono
        await ModeloPersonas.findById(id, (err, actualizarDatos) => {
            actualizarDatos.telefono = newTelefono
            actualizarDatos.save();
            res.send("update");
        })
    } catch (err) {
        console.log(err);
    }

});




app.listen(3001, () => {
    console.log('el servidor esta en el puerto 3001');
})