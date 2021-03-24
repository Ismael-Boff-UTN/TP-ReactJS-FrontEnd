import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/vendor/boxicons/css/boxicons.css";
import "../assets/vendor/icofont/icofont.min.css";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NoticiaDetalles = () => {
  const dispatch = useDispatch();
  const history = useHistory(); //habilitar history para redireccion

  //nuevo state
  const [noticia, setNoticia] = useState({
    tituloNoticia: "",
    idEmpresa: "",
    fechaPublicacion: "",
    resumenNoticia: "",
    contenidoHTML: "",
    imagenNoticia: "",
  });

  const noticiaeditar = useSelector((state) => state.noticias.noticiaeditar);

  const {
    tituloNoticia,
    id_noticia,
    idEmpresa,
    fechaPublicacion,
    resumenNoticia,
    contenidoHTML,
    imagenNoticia,
  } = noticiaeditar;

  //if (!empresa) return null;
  useEffect(() => {
    setNoticia(noticiaeditar);
  }, [noticiaeditar]);

  return (
    <>
      {/* Header */}
      <div
        id="topbar"
        className="d-none d-lg-flex align-items-center fixed-top"
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="icofont-clock-time"></i>Fecha De Publicacion :{" "}
            {fechaPublicacion}
          </div>
        </div>
      </div>
      {/* NavBar */}
      <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center">
          <a href="!#" class="logo mr-auto">
            <img src="../../assets/img/logo.png" alt="" />
          </a>

          <h1 class="logo mr-auto">
            <a href="#!">{tituloNoticia}</a>
          </h1>

          <nav class="nav-menu d-none d-lg-block">
            <ul>
              <li class="active">
                <a href="#header">Inicio</a>
              </li>
              <li>
                <a>Lista Empresas</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section id="about" class="about">
        <div class="container mt-5" data-aos="fade-up">
          <div class="section-title">
            <h1 className="mt-5">-</h1>
            <h2 className="mt-5">Resumen</h2>
            <p>{resumenNoticia}</p>
          </div>

          {/*aca se deberia generar el contenido html apartir de un string  */}

          <div dangerouslySetInnerHTML={{ __html: contenidoHTML }} />
        </div>
      </section>
      <footer id="footer">
        <div className="container">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Empresa</span>
            </strong>
            . Todos Los Derechos Reservados
          </div>
        </div>
      </footer>
    </>
  );
};

export default NoticiaDetalles;
