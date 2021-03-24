import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Empresa from './Empresa';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerEmpresasAction } from '../actions/empresasActions';
import Loading from './Loading';


const ListadoEmpresas = () => {


    const dispatch = useDispatch();


    useEffect(() => {

        //constultar api
        const obtenerEmpresas = () => dispatch(obtenerEmpresasAction());
        obtenerEmpresas();

    }, [])


    const empresas = useSelector(state => state.empresas.empresas);

    const cargando = useSelector(state => state.empresas.loading);
    const error = useSelector(state => state.empresas.error);





    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">

                <div className="container">
                    <Link to="/">    <h1 className="text-light">TP1 LAB4 - React,Redux, REST API(Node.js/Express) & Axios</h1></Link>

                </div>

            </nav>
            <div className='container'>
                <h1 className="text-center">Lista De Empresas</h1>

               

                {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo Un Error</p> : null}
                {cargando ? <Loading/> : null}
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Denominación</th>
                            <th className="text-center" scope="col">Opciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map(empresa =>
                            <Empresa
                                key={empresa.id_empresa}
                                empresa={empresa}
                            />

                        )}


                    </tbody>
                </table>

                <Link to="/nueva-empresa"><button className="btn btn-success">Añadir Nueva Empresa</button></Link>
                <Link to="/lista-noticias">  <button className="btn btn-warning ml-3">Seccion Noticias</button></Link>





            </div>
        </>
    );
}

export default ListadoEmpresas;