import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/vendor/boxicons/css/boxicons.css";
import "../assets/vendor/icofont/icofont.min.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { obtenerNoticiaEditar } from "../actions/noticiasActions";
import { BoxLoading } from 'react-loadingg';

const HomeEmpresa = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  //State Local Empresa
  const [empresa, setEmpresa] = useState({
    denominacion: "",
    telefono: "",
    horarioAtencion: "",
    quienesSomos: "",
    latitud: "",
    longitud: "",
    domicilio: "",
    email: "",
  });
  const [noticias, setNoticias] = useState({
    noticiasASC: [],
  });

  const empresaeditar = useSelector((state) => state.empresas.empresaeditar);
  const noticiasasocidas = useSelector((state) => state.noticias);
  const cargando = useSelector((state) => state.noticias.loading);

  const {
    denominacion,
    telefono,
    horarioAtencion,
    quienesSomos,
    latitud,
    longitud,
    domicilio,
    email,
  } = empresaeditar;

  const { noticiasAsociadas = [] } = noticiasasocidas;

  useEffect(() => {
    //constultar api
    setEmpresa(empresaeditar);
    setNoticias(noticiasasocidas);
  }, [empresaeditar, noticiasasocidas]);

  const redireccionarListaEmpresas = () => {
    history.push("/");
  };
  const redireccionarVerNoticia = (noticia) => {
    dispatch(obtenerNoticiaEditar(noticia));
    history.push(`noticia-detalles/${noticia.id_noticia}`);
  };

  return (
    <>
      {cargando ? (
        <BoxLoading />
      ) : (
        <div>
          {/* Header */}
          <div
            id="topbar"
            className="d-none d-lg-flex align-items-center fixed-top"
          >
            <div className="container d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="icofont-clock-time"></i>
                {horarioAtencion}
              </div>
              <div className="d-flex align-items-center">
                <i className="icofont-phone"></i>
                {telefono}
              </div>
            </div>
          </div>
          {/* NavBar */}
          <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">
              <a href="!#" className="logo mr-auto">
                <img src="../../assets/img/logo.png" alt="" />
              </a>

              <h1 className="logo mr-auto">
                <a href="#!">{denominacion}</a>
              </h1>

              <nav className="nav-menu d-none d-lg-block">
                <ul>
                  <li className="active">
                    <a href="#header">Inicio</a>
                  </li>
                  <li>
                    <a onClick={() => redireccionarListaEmpresas()}>
                      Lista Empresas
                    </a>
                  </li>

                  <li>
                    <a href="#about">Quienes Somos</a>
                  </li>
                  <li>
                    <a href="#contact">Donde Estamos</a>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Ej. Mendoza"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Buscar
                  </button>
                </form>
              </nav>
            </div>
          </header>
          {/* Carrousel/Slider */}

          <section id="hero">
            <div
              id="heroCarousel"
              className="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <ol
                className="carousel-indicators"
                id="hero-carousel-indicators"
              ></ol>

              <div className="carousel-inner" role="listbox">
                {/*Aca Van Los Sliders De Noticias 
             Las Ultimas 5 Noticias Ordenadas De Forma DESCENDENTE
            */}

                <div
                  className="carousel-item active"
                  style={{
                    "background-image": `url(https://i.imgur.com/186OcJ1.png)`,
                  }}
                >
                  <div className="container">
                    <h2>{`${denominacion} Ultimas Noticias!`}</h2>
                  </div>
                </div>

                {noticiasAsociadas.map((noticia) => (
                  <div
                    className="carousel-item"
                    style={{
                      "background-image": `url(${noticia.imagenNoticia})`,
                    }}
                  >
                    <div className="container">
                      <h2>{noticia.tituloNoticia}</h2>
                      <p>{noticia.resumenNoticia}</p>
                      <button
                        className="btn btn-primary mr-3"
                        onClick={() => redireccionarVerNoticia(noticia)}
                      >
                        Ver Noticia
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <a
                className="carousel-control-prev"
                href="#heroCarousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon icofont-simple-left"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Anterios</span>
              </a>

              <a
                className="carousel-control-next"
                href="#heroCarousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon icofont-simple-right"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Siguiente</span>
              </a>
            </div>
          </section>
          {/* Quienes Somos */}
          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2>Quienes Somos</h2>

                <p>{quienesSomos}</p>
              </div>
            </div>
          </section>
          {/* Donde Estamos */}
          <section id="contact" className="contact">
            <div className="container">
              <div className="section-title">
                <h2>Donde Estamos</h2>
              </div>
            </div>

            <div>
              <iframe
                style={{ border: 0, width: "100%", height: "350px" }}
                src={`https://maps.google.com/maps?q=${latitud}, ${longitud}&zoom=5&output=embed`}
                frameborder="0"
                allowfullscreen={true}
              ></iframe>
            </div>

            <div className="container">
              <div className="row mt-5">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="info-box">
                        <i className="bx bx-map"></i>
                        <h3>Nuestra Dirección</h3>
                        <p>{domicilio}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box mt-4">
                        <i className="bx bx-envelope"></i>
                        <h3>Email</h3>
                        <p>{email}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box mt-4">
                        <i className="bx bx-phone-call"></i>
                        <h3>Llamanos</h3>
                        <p>{telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <form className="php-email-form">
                    <div className="form-row">
                      <div className="col form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Nombre"
                          data-rule="minlen:4"
                          data-msg="Please enter at least 4 chars"
                        />
                        <div className="validate"></div>
                      </div>
                      <div className="col form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          data-rule="email"
                          data-msg="Please enter a valid email"
                        />
                        <div class="validate"></div>
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Proposito"
                        data-rule="minlen:4"
                        data-msg="Please enter at least 8 chars of subject"
                      />
                      <div class="validate"></div>
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        name="message"
                        rows="5"
                        data-rule="required"
                        data-msg="Porfavor Escribenos Algo..."
                        placeholder="Mensaje"
                      ></textarea>
                      <div class="validate"></div>
                    </div>
                    <div class="mb-3">
                      <div class="loading">Cargando</div>
                      <div class="error-message"></div>
                      <div class="sent-message">
                        Tu Mensaje Ha Sido Envido! Gracias
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="submit">Enviar Mensaje</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* Footer */}
          <footer id="footer">
            <div className="container">
              <div className="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>{denominacion}</span>
                </strong>
                . Todos Los Derechos Reservados
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default HomeEmpresa;
