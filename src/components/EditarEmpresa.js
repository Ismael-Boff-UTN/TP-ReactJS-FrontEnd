import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editarEmpresaAction } from '../actions/empresasActions';



const EditarEmpresa = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    //nuevo state
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

    const empresaeditar = useSelector(state => state.empresas.empresaeditar);
   
    //if (!empresa) return null;
    useEffect(() => {
        setEmpresa(empresaeditar);
    }, [empresaeditar])

    
    


    //Obtenemos Los Datos De Los Inputs
    const onChangeFormEditar = e => {
        setEmpresa({
            ...empresa,
            [e.target.name]: e.target.value
        })
    }
    const { denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email } = empresaeditar;


    const submitEditarEmpresa = (e) => {
        e.preventDefault();

        dispatch(editarEmpresaAction(empresa));
        history.push('/')
    }


    return (
        <>
            <div className="jumbotron">
                <h1 className='text-center'>Editar Empresa</h1>


                <div className="container col-md-6">

                    <form onSubmit={submitEditarEmpresa}>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Denominacion"
                                    name="denominacion"
                                    defaultValue={denominacion}
                                    onChange={onChangeFormEditar}
                                    

                                   
                                />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Telefono"
                                    name="telefono" defaultValue={telefono} onChange={onChangeFormEditar} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Latitud" name="latitud" defaultValue={latitud} onChange={onChangeFormEditar} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Longitud" name="longitud" defaultValue={longitud} onChange={onChangeFormEditar} />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlTextarea1">Quienes Somos</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="quienesSomos" defaultValue={quienesSomos} onChange={onChangeFormEditar}></textarea>

                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Horario De Atencion" name="horarioAtencion" defaultValue={horarioAtencion} onChange={onChangeFormEditar} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Domicilio" name="domicilio" defaultValue={domicilio} onChange={onChangeFormEditar} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Email" name="email" defaultValue={email} onChange={onChangeFormEditar} />
                            </div>

                        </div>

                        <button className='btn btn-success mt-5 btn-block' type="submit">Editar</button>
                        <Link to="/">  <button className='btn btn-danger mt-3 btn-block'>Cancelar/Volver</button></Link>
                    </form>


                </div>
            </div>
        </>
    );
}

export default EditarEmpresa;