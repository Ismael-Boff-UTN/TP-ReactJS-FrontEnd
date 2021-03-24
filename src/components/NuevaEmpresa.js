import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

//Action
import { crearEmpresaAction } from '../actions/empresasActions';




const NuevaEmpresa = (props) => {

    //State
    //State Para La Empresa
    const [empresa, setEmpresa] = useState({
        denominacion: '',
        telefono: '',
        horarioAtencion: '',
        quienesSomos: '',
        latitud: '',
        longitud: '',
        domicilio: '',
        email: '',


    });
    //Extraer Empresa
    const { denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email } = empresa;

    //Obtenemos Los Datos De Los Inputs
    const onChange = e => {
        setEmpresa({
            ...empresa,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch();

    const cargando = useSelector(state => state.empresas.loading);
    const error = useSelector(state => state.empresas.error);

    const agregarEmpresa = (empresa) => dispatch(crearEmpresaAction(empresa))


    const onSubmit = e => {
        e.preventDefault();

        //Validaciones
        if (denominacion === '' || telefono === '' || horarioAtencion === '' ||
            quienesSomos === '' || latitud === '' || longitud === '' || domicilio === '' || email === '') {

            Swal.fire(
                '',
                'Campos Vacios',
                'error'
            )
            return;
        }


        //crear empresa
        agregarEmpresa(empresa);


        //Reset Form
        setEmpresa({
            denominacion: '',
            telefono: '',
            horarioAtencion: '',
            quienesSomos: '',
            latitud: '',
            longitud: '',
            domicilio: '',
            email: '',
        })

        props.history.push('/');  
    }

    return (
        <>
            <div className="jumbotron">
                <h1 className='text-center'>Agregar Nueva Empresa</h1>


                <div className="container col-md-6">

                    <form onSubmit={onSubmit}>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Denominacion"
                                    value={denominacion}
                                    onChange={onChange}
                                    name="denominacion" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Telefono" value={telefono}
                                    onChange={onChange} name="telefono" />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Latitud" value={latitud}
                                    onChange={onChange} name="latitud" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Longitud" value={longitud}
                                    onChange={onChange} name="longitud" />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlTextarea1">Quienes Somos</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={quienesSomos}
                                onChange={onChange} name="quienesSomos"></textarea>

                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Horario De Atencion" value={horarioAtencion}
                                    onChange={onChange} name="horarioAtencion" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Domicilio" value={domicilio}
                                    onChange={onChange} name="domicilio" />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Email" value={email}
                                    onChange={onChange} name="email" />
                            </div>

                        </div>

                        <button className='btn btn-success mt-5 btn-block' type="submit">Agregar</button>
                        <Link to="/">  <button className='btn btn-danger mt-3 btn-block'>Cancelar/Volver</button></Link>
                    </form>
                    {cargando ? <p>Cargando...</p> : null}
                    {error ? <p className="alert alert-danger mt-3 text-center">Hubo Un Error</p> : null}

                </div>
            </div>
        </>
    );
}

export default NuevaEmpresa;