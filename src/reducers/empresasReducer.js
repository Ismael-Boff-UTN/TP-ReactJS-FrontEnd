//Cada Reducer Tiene Su Propio State

import {
    AGREGAR_EMPRESA, AGREGAR_EMPRESA_EXITO, AGREGAR_EMPRESA_ERROR, OBTENER_EMPRESAS, OBTENER_EMPRESAS_EXITO, OBTENER_EMPRESAS_ERROR,
    OBTENER_EMPRESA_ELIMINAR, OBTENER_EMPRESA_ELIMINAR_EXITO, OBTENER_EMPRESA_ELIMINAR_ERROR,
    OBTENER_EMPRESA_EDITAR,OBTENER_EMPRESA_EDITAR_EXITO,OBTENER_EMPRESA_EDITAR_ERROR,COMENZAR_EDICION_EMPRESA
} from '../types';

const initialState = {
    empresas: [],
    error: null,
    loading: false,
    empresaeliminar: null,
    empresaeditar: null
}




export default function (state = initialState, action) {
    switch (action.type) {
        case AGREGAR_EMPRESA:

            return {
                ...state,
                loading: true
            }
        case AGREGAR_EMPRESA_EXITO:
            return {
                ...state,
                loading: false,
                empresas: [...state.empresas, action.payload]
            }
        case OBTENER_EMPRESAS_ERROR:
        case AGREGAR_EMPRESA_ERROR:
        case OBTENER_EMPRESA_ELIMINAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_EMPRESAS:
            return {
                ...state,
                loading: action.payload,
            }
        case OBTENER_EMPRESAS_EXITO:
            return {
                ...state,
                loading: false,
                error: false,
                empresas: action.payload
            }
        case OBTENER_EMPRESA_ELIMINAR:
            return {
                ...state,
                empresaeliminar: action.payload
            }
        case OBTENER_EMPRESA_ELIMINAR_EXITO:
            return {
                ...state,
                empresas: state.empresas.filter(empresa => empresa.id_empresa !==
                    state.empresaeliminar),
                empresaeliminar: null
            }
        case OBTENER_EMPRESA_EDITAR:
            return{
                ...state,
                empresaeditar: action.payload
            }
        default:
            return state;
    }
};