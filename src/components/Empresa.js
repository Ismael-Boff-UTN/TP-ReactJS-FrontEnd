import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { eliminarEmpresaAction, obtenerEmpresaEditar } from '../actions/empresasActions';
import { obtenerNoticiasAsociadasAction } from "../actions/noticiasActions";






const Empresa = ({ empresa }) => {

    const { denominacion, id_empresa } = empresa;

    const dispatch = useDispatch();
    const history = useHistory(); //habilitar history para redireccion

    //Confirmar Si desea eliminarlo
    const confirmarEliminarEmpresa = id => {
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
                dispatch(eliminarEmpresaAction(id));

            }
        })

    }

    //redireccion con hooks
    const redireccionarEdicion = empresa => {
        dispatch(obtenerEmpresaEditar(empresa));
        history.push(`editar-empresa/${empresa.id_empresa}`)
    }

    const redireccionarVerEmpresa = empresa =>{
        dispatch(obtenerNoticiasAsociadasAction(empresa.id_empresa));
        dispatch(obtenerEmpresaEditar(empresa));
      
        history.push(`home/${empresa.id_empresa}`)
    }








    return (

        <tr>
            <th scope="row">{id_empresa}</th>
            <td>{denominacion}</td>
            <td>

                <button className="btn btn-primary mr-3" onClick={() => redireccionarVerEmpresa(empresa)}>Ver Empresa</button>
                <button className="btn btn-danger mr-3" onClick={() => confirmarEliminarEmpresa(id_empresa)}>Eliminar</button>
                <button className="btn btn-secondary mr-3" onClick={() => redireccionarEdicion(empresa)}>Editar</button>



            </td>

        </tr>
    );
}

export default Empresa;