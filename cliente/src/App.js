import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Input, Table, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPen, faPlusCircle, faTimesCircle, } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 500,
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: "10px 10px 10px 10px",
    padding: "16px 32px 24px",
    fontFamily: "Times New Roman",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  botones: {
    marginTop: '15px'
  }
}))

function App() {

  //Estilos y Funciones ventanas emergentes
  const styles = useStyles();

  const [agregar, setAgregar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [datos, setDato] = useState([]);;

  const abrirCerrarAgregar = () => {
    setAgregar(!agregar);
  }

  const abrirCerrarEditar = (usuario) => {
    setDato(usuario);
    setEditar(!editar);
  }

  // const para aquegar
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState(0);
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState(0);

  // const para editar
  const [newNombres, setNewNombres] = useState("");
  const [newApellidos, setNewApellidos] = useState("");
  const [newCedula, setNewCedula] = useState(0);
  const [newCorreo, setNewCorreo] = useState("");
  const [newTelefono, setNewTelefono] = useState(0);

  // const para leer de base de datos
  const [usuarios, setUsuarios] = useState([]);

  //trae los datos de la base de datos
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setUsuarios(response.data);
    })

  }, [])

  //agregar datos a la base de datos
  const addToList = () => {
    axios({
      method: 'post',
      url: 'insert',
      baseURL: 'http://localhost:3001',
      data: {
        nombres: nombres,
        apellidos: apellidos,
        cedula: cedula,
        correo: correo,
        telefono: telefono
      }
    });
  }

  //Ventana para diligenciar formulario de agregar
  const bodyAgregar = (
    <div className={styles.modal}>
      <div align="center">
        <h2>AGREGAR USUARIO</h2>
      </div>
      <form onSubmit={addToList}>
        <Label>NOMBRES </Label>
        <Input
          type="text"
          pattern="[a-zA-Z ]{2,20}"
          placeholder="Ingrese solo letras"
          onChange={(event) => { setNombres(event.target.value) }}
          required
        />

        <Label>APELLIDOS</Label>
        <Input
          type="text"
          pattern="[a-zA-Z ]{2,20}"
          placeholder="Ingrese solo letras"
          onChange={(event) => { setApellidos(event.target.value) }}
          required
        />

        <Label>CEDULA</Label>
        <Input
          type="number"
          pattern="[0-9]"
          placeholder="Ingrese solo numeros"
          onChange={(event) => { setCedula(event.target.value) }}
          required
        />

        <Label>CORREO</Label>
        <Input
          type="email"
          placeholder="Ingrese correo"
          onChange={(event) => { setCorreo(event.target.value) }}
          required />

        <Label>TELEFONO</Label>
        <Input
          type="number"
          pattern="[0-9]"
          placeholder="Ingrese solo numeros"
          onChange={(event) => { setTelefono(event.target.value) }}
          required
        />

        <div className={styles.botones} align="center">
          <Button color="primary">AGREGAR</Button>{" "}
          <Button onClick={() => abrirCerrarAgregar()}>CANCELAR</Button>
        </div>
      </form>
    </div>

  )

  //actualiza base de datos
  const actualizarNombre = (id) => {
    axios({
      method: 'post',
      url: 'nombres',
      baseURL: 'http://localhost:3001',
      data: {
        id: id,
        newNombres: newNombres
      }
    });
  }
  const actualizarApellidos = (id) => {
    axios({
      method: 'post',
      url: 'apellidos',
      baseURL: 'http://localhost:3001',
      data: {
        id: id,
        newApellidos: newApellidos,
      }
    });
  }
  const actualizarCedula = (id) => {
    axios({
      method: 'post',
      url: 'cedula',
      baseURL: 'http://localhost:3001',
      data: {
        id: id,
        newCedula: newCedula,
      }
    });
  }

  const actualizarCorreo = (id) => {
    axios({
      method: 'post',
      url: 'correo',
      baseURL: 'http://localhost:3001',
      data: {
        id: id,
        newCorreo: newCorreo,
      }
    });
  }

  const actualizarTelefono = (id) => {
    //axios.put("http://localhost:3001/update", {})
    axios({
      method: 'post',
      url: 'telefono',
      baseURL: 'http://localhost:3001',
      data: {
        id: id,
        newTelefono: newTelefono
      }
    });
  }


  //Ventana para diligenciar formulario de editar
  const bodyEditar = (
    <div className={styles.modal}>
      <div align="center">
        <h2>EDITAR USUARIO
          <Button className="cerrar" color="" onClick={() => abrirCerrarEditar([])}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>
        </h2>
        <p>(Ingrese nuevo valor o antiguo valor si no desea editar)</p>
      </div>

      <form onSubmit={() => actualizarNombre(datos._id)}>
        <Label>NOMBRES: {datos.nombres} </Label>
        <Input
          type="text"
          className="form-control"
          pattern="[a-zA-Z ]{2,20}"
          onChange={(event) => { setNewNombres(event.target.value) }}
          required
        />
        <div align="center">
          <Button color="primary">ACTUALIZAR</Button>
        </div>

      </form>

      <form onSubmit={() => actualizarApellidos(datos._id)}>
        <Label>APELLIDOS: {datos.apellidos}</Label>
        <Input
          type="text"
          pattern="[a-zA-Z ]{2,20}"
          onChange={(event) => { setNewApellidos(event.target.value) }}
          required
        />
        <div align="center">
          <Button color="primary">ACTUALIZAR</Button>
        </div>
      </form>

      <form onSubmit={() => actualizarCedula(datos._id)}>
        <Label>CEDULA: {datos.cedula}</Label>
        <Input
          type="number"
          pattern="[0-9]"
          onChange={(event) => { setNewCedula(event.target.value) }}
          required
        />
        <div align="center">
          <Button color="primary">ACTUALIZAR</Button>
        </div>
      </form>

      <form onSubmit={() => actualizarCorreo(datos._id)}>
        <Label>CORREO: {datos.correo}</Label>
        <Input
          type="email"
          onChange={(event) => { setNewCorreo(event.target.value) }}
          required
        />
        <div align="center">
          <Button color="primary">ACTUALIZAR</Button>
        </div>
      </form>

      <form onSubmit={() => actualizarTelefono(datos._id)}>
        <Label>TELEFONO: {datos.telefono}</Label>
        <Input
          type="number"
          pattern="[0-9]"
          onChange={(event) => { setNewTelefono(event.target.value) }}
          required
        />
        <div align="center">
          <Button color="primary">ACTUALIZAR</Button>
        </div>
      </form>

    </div>

  )


  return (

    <div className="cuerpo">

      <div className="tabla">
        <div className="titulo">
          USUARIOS {" "}
          <Button className="accion" color="primary" onClick={() => abrirCerrarAgregar()} >
            <FontAwesomeIcon icon={faPlusCircle} /> Agregar
          </Button>
        </div>

        <Modal open={agregar} onClose={abrirCerrarAgregar}>
          {bodyAgregar}
        </Modal>

        {/* TABLA DE USUARIOS */}
        <Table >
          <thead >
            <tr>
              <th>N°</th>
              <th>NOMBRES</th>
              <th>APELLIDOS</th>
              <th>CEDULA</th>
              <th>CORREO</th>
              <th>TELEFONO</th>
              <th>ACCION</th>
            </tr>

          </thead>
          <tbody>
            {usuarios.map((val, key) => {
              return (
                <tr key={key}>
                  <th>{key + 1}</th>
                  <th>{val.nombres}</th>
                  <th>{val.apellidos}</th>
                  <th>{val.cedula}</th>
                  <th>{val.correo}</th>
                  <th>{val.telefono}</th>
                  <th>
                    <Button className="accion" color="success" onClick={() => abrirCerrarEditar(val)} >
                      <FontAwesomeIcon icon={faPen} /> Editar
                    </Button>
                  </th>
                </tr>

              )
            })}

            <Modal open={editar} onClose={abrirCerrarEditar}>
              {bodyEditar}
            </Modal>

            {/* {usuarios.map((val, key) => {
              return (
                <tr>
                  <th>{key + 1}</th>
                  <th>
                    <Input type="text" defaultValue={val.nombres} onChange={(event) => { setNewNombres(event.target.value) }} />
                  </th>
                  <th>
                    <Input type="text" onChange={(event) => { setNewApellidos(event.target.defaultValue) }} />
                  </th>
                  <th>
                    <Input type="number" onChange={(event) => { setNewCedula(event.target.value) }} />
                  </th>
                  <th>
                    <Input type="text"  onChange={(event) => { setNewCorreo(event.target.value) }} />
                  </th>
                  <th>
                    <Input type="number" onChange={(event) => { setNewTelefono(event.target.value) }} />
                  </th>
                  <th>
                    <Button className="accion" color="success" onClick={() => actualizarDatos(val._id)}>
                      <FontAwesomeIcon icon={faRedo} /> Actualizar
                    </Button>
                  </th>
                </tr>

              )
            })} */}



          </tbody>
        </Table>

      </div>

    </div>


  )

}



export default App;
