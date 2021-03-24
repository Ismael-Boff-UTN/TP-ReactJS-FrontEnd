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
  OBTENER_NOTICIA_EDITAR,
  OBTENER_NOTICIAS_ASOCIADAS,
  OBTENER_NOTICIAS_ASOCIADAS_EXITO,
  OBTENER_NOTICIAS_ASOCIADAS_ERROR,
} from "../types";

const initialState = {
  noticias: [],
  noticiasAsociadas: [],
  error: null,
  loading: false,
  noticiaeliminar: null,
  noticiaeditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_NOTICIA:
      return {
        ...state,
        loading: true,
      };
    case AGREGAR_NOTICIA_EXITO:
      return {
        ...state,
        loading: false,
        noticias: [...state.noticias, action.payload],
      };
    case OBTENER_NOTICIAS_ERROR:
    case AGREGAR_NOTICIA_ERROR:
    case OBTENER_NOTICIA_ELIMINAR_ERROR:
    case OBTENER_NOTICIAS_ASOCIADAS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OBTENER_NOTICIAS:
      return {
        ...state,
        loading: action.payload,
      };
    case OBTENER_NOTICIAS_EXITO:
      return {
        ...state,
        loading: false,
        error: false,
        noticias: action.payload,
      };
    case OBTENER_NOTICIA_ELIMINAR:
      return {
        ...state,
        noticiaeliminar: action.payload,
      };
    case OBTENER_NOTICIA_ELIMINAR_EXITO:
      return {
        ...state,
        noticias: state.noticias.filter(
          (noticia) => noticia.id_noticia !== state.noticiaeliminar
        ),
        noticiaeliminar: null,
      };
    case OBTENER_NOTICIA_EDITAR:
      return {
        ...state,
        noticiaeditar: action.payload,
      };
    case OBTENER_NOTICIAS_ASOCIADAS:
      return {
        ...state,
        loading: true,
      };
    case OBTENER_NOTICIAS_ASOCIADAS_EXITO:
      return {
        ...state,
       
        error: false,
        noticiasAsociadas: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
