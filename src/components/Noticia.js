import React from "react";
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {  eliminarNoticiaAction, obtenerNoticiaEditar } from '../actions/noticiasActions';

//Redux
import { useDispatch } from 'react-redux';


const Noticia = ({noticia}) => {


    const { tituloNoticia, id_noticia, idEmpresa } = noticia;

    const dispatch = useDispatch();
    const history = useHistory(); //habilitar history para redireccion

    //Confirmar Si desea eliminarlo
    const confirmarEliminarNoticia = id => {
        //preguntar
        Swal.fire({
            title: "Estas Seguro?",
            text: "No Podras Revertir Esta Accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.value) {
                //pasar al action
                dispatch(eliminarNoticiaAction(id));

            }
        })

    }

    const redireccionarEdicion = noticia => {
      dispatch(obtenerNoticiaEditar(noticia));
      history.push(`editar-noticia/${noticia.id_noticia}`)
  }
    const redireccionarVerNoticia = noticia =>{
        dispatch(obtenerNoticiaEditar(noticia));
        history.push(`noticia-detalles/${noticia.id_noticia}`)
    }
  return (
    <tr>
      <th scope="row">{id_noticia}</th>
      <td>{tituloNoticia}</td>
      <td>{idEmpresa}</td>
      <td>
        <button className="btn btn-primary mr-3"  onClick={() => redireccionarVerNoticia(noticia)}>Ver Noticia</button>
        <button
          className="btn btn-danger mr-3"
          onClick={() => confirmarEliminarNoticia(id_noticia)}
        >
          Eliminar
        </button>
        <button
          className="btn btn-secondary mr-3"
          onClick={() => redireccionarEdicion(noticia)}
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

export default Noticia;
