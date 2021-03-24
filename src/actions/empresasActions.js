import {
    AGREGAR_EMPRESA, AGREGAR_EMPRESA_EXITO,
    AGREGAR_EMPRESA_ERROR, OBTENER_EMPRESAS,
    OBTENER_EMPRESAS_EXITO, OBTENER_EMPRESAS_ERROR,
    OBTENER_EMPRESA_ELIMINAR, OBTENER_EMPRESA_ELIMINAR_EXITO, OBTENER_EMPRESA_ELIMINAR_ERROR,
    OBTENER_EMPRESA_EDITAR, OBTENER_EMPRESA_EDITAR_EXITO, OBTENER_EMPRESA_EDITAR_ERROR, COMENZAR_EDICION_EMPRESA
} from '../types';
import axios from 'axios';
import Swal from 'sweetalert2';




//Funciones POST
export function crearEmpresaAction(empresa) {
    return async (dispatch) => {
        dispatch(agregarEmpresa());

        try {
            await axios.post('http://localhost:5000/api/empresas', empresa);
            dispatch(crearEmpresaExito(empresa));

            //Alerta
            Swal.fire(
                '',
                'Empresa Agregaga Con Exito',
                'success'
            )
        } catch (error) {
            dispatch(crearEmpresaError(true));
        }
    }
}

const agregarEmpresa = () => ({

    type: AGREGAR_EMPRESA

})

const crearEmpresaExito = (empresa) => ({
    type: AGREGAR_EMPRESA_EXITO,
    payload: empresa

})

const crearEmpresaError = (estado) => ({
    type: AGREGAR_EMPRESA_ERROR,
    payload: estado
})



//Funciones GET
export function obtenerEmpresasAction() {
    return async (dispatch) => {
        dispatch(obtenerEmpresas());

        try {

            const empresas = await axios.get('http://localhost:5000/api/empresas');
            dispatch(obtenerEmpresasExito(empresas.data));




        } catch (error) {
            dispatch(obtenerEmpresasError(true));
        }
    }
}

const obtenerEmpresas = () => ({

    type: OBTENER_EMPRESAS,
    payload: true

})
const obtenerEmpresasExito = (empresas) => ({

    type: OBTENER_EMPRESAS_EXITO,
    payload: empresas

})
const obtenerEmpresasError = () => ({

    type: OBTENER_EMPRESAS_ERROR,
    payload: true

})



//Funciones DELETE
export function eliminarEmpresaAction(id) {
    return async (dispatch) => {
        dispatch(obtenerEmpresaEliminar(id));

        try {
            const resultado = await axios.delete(`http://localhost:5000/api/empresas/${id}`);
            dispatch(eliminarEmpresaExito());
            Swal.fire(
                'Eliminado!',
                'La Empresa Fue Eliminada',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarEmpresaError());
        }
    }
}

const obtenerEmpresaEliminar = (id) => ({

    type: OBTENER_EMPRESA_ELIMINAR,
    payload: id
})

const eliminarEmpresaExito = () => ({
    type: OBTENER_EMPRESA_ELIMINAR_EXITO

})

const eliminarEmpresaError = () => ({
    type: OBTENER_EMPRESA_ELIMINAR_ERROR,
    payload: true
})

//Funciones PUT

export function obtenerEmpresaEditar(empresa) {
    return (dispatch) => {
        dispatch(obtenerEmpresaEditarAction(empresa));
    }
}

const obtenerEmpresaEditarAction = empresa => ({
    type: OBTENER_EMPRESA_EDITAR,
    payload: empresa
})

//Se Hace El PUT En La API
export function editarEmpresaAction(empresa) {
    return async (dispatch) => {
        dispatch(editarEmpresa(empresa));

        try {
            const resultado = await axios.put(`http://localhost:5000/api/empresas/${empresa.id_empresa}`, empresa);
         
            console.log(resultado);
            
            Swal.fire(
                'Editado!',
                'La Empresa Fue Editada',
                'success'
            )
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Error!',
                'La Empresa No Pudo Ser Editada',
                'error'
            )
        }
    }
}

const editarEmpresa = empresa => ({
    type: COMENZAR_EDICION_EMPRESA,
    payload: empresa
})

