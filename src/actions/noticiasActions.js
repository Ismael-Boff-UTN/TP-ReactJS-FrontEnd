import {
  AGREGAR_NOTICIA,
  AGREGAR_NOTICIA_EXITO,
  AGREGAR_NOTICIA_ERROR,
  OBTENER_NOTICIAS,
  OBTENER_NOTICIAS_EXITO,
  OBTENER_NOTICIAS_ERROR,
  OBTENER_NOTICIA_ELIMINAR,
  OBTENER_NOTICIA_ELIMINAR_EXITO,
  OBTENER_NOTICIA_ELIMINAR_ERROR,
  COMENZAR_EDICION_NOTICIA,
  OBTENER_NOTICIA_EDITAR,
  OBTENER_NOTICIAS_ASOCIADAS,
  OBTENER_NOTICIAS_ASOCIADAS_EXITO,
  OBTENER_NOTICIAS_ASOCIADAS_ERROR,
} from "../types";
import axios from "axios";
import Swal from "sweetalert2";

//FUNCION PARA OBTENER TODAS LAS NOTICIAS DESDE LA BASE (GET)
export function obtenerNoticiasAction() {
  return async (dispatch) => {
    dispatch(obtenerNoticias());

    try {
      const noticias = await axios.get("http://localhost:5000/api/noticias");
      dispatch(obtenerNoticiasExito(noticias.data));
    } catch (error) {
      dispatch(obtenerNoticiasError(true));
    }
  };
}

const obtenerNoticias = () => ({
  type: OBTENER_NOTICIAS,
  payload: true,
});
const obtenerNoticiasExito = (noticias) => ({
  type: OBTENER_NOTICIAS_EXITO,
  payload: noticias,
});
const obtenerNoticiasError = () => ({
  type: OBTENER_NOTICIAS_ERROR,
  payload: true,
});

//FUNCION PARA OBTENER LAS NOTICIAS RELACIONADAS A UNA EMPRESA (GET BY id_empresa)
export function obtenerNoticiasAsociadasAction(id){
  return async (dispatch) =>{
    dispatch(obtenerNoticiasAsc(id));

    try {
      const noticiasAsc = await axios.get(`http://localhost:5000/api/noticias/noticias-asociadas/${id}`);
      console.log(noticiasAsc.data);
      dispatch(obtenerNoticiasAscExito(noticiasAsc.data));
    } catch (error) {
      dispatch(obtenerNoticiasAscError(true));
    }
    
  }
}
const obtenerNoticiasAsc = (id) => ({
  type: OBTENER_NOTICIAS_ASOCIADAS,
  payload: id,
});
const obtenerNoticiasAscExito = (noticias) => ({
  type: OBTENER_NOTICIAS_ASOCIADAS_EXITO,
  payload: noticias,
});
const obtenerNoticiasAscError = () => ({
  type: OBTENER_NOTICIAS_ASOCIADAS_ERROR,
  payload: true,
});

//FUNCION PARA GUARDAR UNA NOTICIA EN LA BASE DE DATOS (POST)
export function crearNoticiaAction(noticia) {
  return async (dispatch) => {
    dispatch(agregarNoticia());

    try {
      await axios.post("http://localhost:5000/api/noticias", noticia);
      dispatch(crearNoticiaExito(noticia));

      //Alerta
      Swal.fire("", "Noticia Agregaga Con Exito", "success");
    } catch (error) {
      dispatch(crearNoticiaError(true));
    }
  };
}

const agregarNoticia = () => ({
  type: AGREGAR_NOTICIA,
});

const crearNoticiaExito = (noticia) => ({
  type: AGREGAR_NOTICIA_EXITO,
  payload: noticia,
});

const crearNoticiaError = (estado) => ({
  type: AGREGAR_NOTICIA_ERROR,
  payload: estado,
});



//FUNCION PARA ELIMINAR UNA NOTICIA DE LA BASE DE DATOS (DELETE)
export function eliminarNoticiaAction(id) {
  return async (dispatch) => {
    dispatch(obtenerNoticiaEliminar(id));

    try {
      const resultado = await axios.delete(
        `http://localhost:5000/api/noticias/${id}`
      );
      dispatch(eliminarNoticiaExito());
      Swal.fire("Eliminado!", "La Noticia Fue Eliminada", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarNoticiaError());
    }
  };
}

const obtenerNoticiaEliminar = (id) => ({
  type: OBTENER_NOTICIA_ELIMINAR,
  payload: id,
});

const eliminarNoticiaExito = () => ({
  type: OBTENER_NOTICIA_ELIMINAR_EXITO,
});

const eliminarNoticiaError = () => ({
  type: OBTENER_NOTICIA_ELIMINAR_ERROR,
  payload: true,
});

//FUNCION PARA ELIMINAR UNA NOTICIA DE LA BASE DE DATOS (PUT)
export function obtenerNoticiaEditar(noticia) {
  return (dispatch) => {
    dispatch(obtenerNoticiaEditarAction(noticia));
  };
}

const obtenerNoticiaEditarAction = (noticia) => ({
  type: OBTENER_NOTICIA_EDITAR,
  payload: noticia,
});

//Se Hace El PUT En La API
export function editarNoticiaAction(noticia) {
  return async (dispatch) => {
    dispatch(editarNoticia(noticia));

    try {
      const resultado = await axios.put(
        `http://localhost:5000/api/noticias/${noticia.id_noticia}`,
        noticia
      );
      console.log(resultado);
      Swal.fire("Editado!", "La Noticia Fue Editada", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "La Noticia No Pudo Ser Editada", "error");
    }
  };
}

const editarNoticia = (noticia) => ({
  type: COMENZAR_EDICION_NOTICIA,
  payload: noticia,
});
