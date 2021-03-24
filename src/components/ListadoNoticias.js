import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Noticia from "./Noticia";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNoticiasAction } from "../actions/noticiasActions";

const ListadoNoticias = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //constultar api
    const obtenerNoticias = () => dispatch(obtenerNoticiasAction());
    obtenerNoticias();
  }, []);

  const noticias = useSelector((state) => state.noticias.noticias);

  const cargando = useSelector((state) => state.noticias.loading);
  const error = useSelector((state) => state.noticias.error);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <div className="container">
          <Link to="/">
            <h1 className="text-light">
              TP1 LAB4 - React,Redux, REST API(Node.js/Express) & Axios
            </h1>
          </Link>
        </div>
      </nav>
      <div className="container">
        <h1 className="text-center">Lista De Noticias</h1>

        <div className="table-responsive-sm">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Titulo</th>
                <th scope="col">idEmpresa</th>
                <th className="text-center" scope="col">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((noticia) => (
                <Noticia key={noticia.id_noticia} noticia={noticia} />
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/nueva-noticia">
          <button className="btn btn-success">Añadir Nueva Noticia</button>
        </Link>
        <Link to="/">
          {" "}
          <button className="btn btn-warning ml-3">Volver A Empresas</button>
        </Link>
      </div>
    </>
  );
};

export default ListadoNoticias;
