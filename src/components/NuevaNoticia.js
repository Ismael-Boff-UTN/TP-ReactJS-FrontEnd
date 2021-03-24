import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEmpresasAction } from "../actions/empresasActions";
import { crearNoticiaAction } from "../actions/noticiasActions";
import Swal from "sweetalert2";

const NuevaNoticia = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //State Para La Empresa
  const [noticia, setNoticia] = useState({
    tituloNoticia: "",
    resumenNoticia: "",
    contenidoHTML: "",
    publicada: "",
    fechaPublicacion: new Date().toLocaleDateString(),
    idEmpresa: "",
    imagenNoticia: "",
  });

  useEffect(() => {
    const obtenerEmpresas = () => dispatch(obtenerEmpresasAction());
    obtenerEmpresas();
  }, []);

  const empresas = useSelector((state) => state.empresas.empresas);
  const agregarNoticia = (noticia) => dispatch(crearNoticiaAction(noticia));

  //Obtenemos Los Datos De Los Inputs Para Agregarlos Al State
  const onChange = (e) => {
    setNoticia({
      ...noticia,
      [e.target.name]: e.target.value,
    });
  };

  //Extraer Noticia
  const {
    tituloNoticia,
    resumenNoticia,
    contenidoHTML,
    publicada,
    fechaPublicacion,
    idEmpresa,
    imagenNoticia,
  } = noticia;

  //Cuando Se Da Click En Guardar Noticia
  const onSubmit = (e) => {
    e.preventDefault();

    //Validaciones
    if (
      tituloNoticia === "" ||
      resumenNoticia === "" ||
      contenidoHTML === "" ||
      publicada === "Seleccione Estado" ||
      publicada === "" ||
      idEmpresa === ""
    ) {
      Swal.fire("", "Campos Vacios", "error");
      return;
    }

    //Erear Empresa
    agregarNoticia(noticia);
    //Redireccion A Lista De Noticias
    history.push("/lista-noticias");
    //Reset Form
  };

  //Agrego El Contenido HTML Del TinyMCE Al State
  const handleEditorChange = (content, editor, e) => {
    setNoticia({
      ...noticia,
      contenidoHTML: content,
    });
  };

  //Funcion Para Convertir La Imagen A Base64
  const selectImage = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      setNoticia({
        ...noticia,
        imagenNoticia: reader.result,
      });
      console.log(reader.result);
    };
  };

  return (
    <>
      <div className="jumbotron">
        <h1 className="text-center">Agregar Noticia</h1>

        <div className="container col-md-6">
          <form onSubmit={onSubmit}>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titulo Noticia"
                  onChange={onChange}
                  value={tituloNoticia}
                  name="tituloNoticia"
                />
              </div>
              <div className="col">
                <select
                  class="form-control"
                  name="publicada"
                  onChange={onChange}
                >
                  <option>Seleccione Estado</option>
                  <option value="y">Publicada</option>
                  <option value="n">No Publicada</option>
                </select>
              </div>
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01">
                  Imagen
                </span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  name="imgNoticia"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  multiple
                  onChange={selectImage}
                />
                <label class="custom-file-label" for="inputGroupFile01">
                  Elegir Archivo
                </label>
              </div>
            </div>
            <h4 className="mt-3">Preview Imagen</h4>
            <div className="row mt-3">
              <div className="col">
                <div
                  class="card"
                  style={{ maxWidth: "10rem", maxHeight: "10rem" }}
                >
                  <img src={imagenNoticia} class="card-img-top" alt="..." />
                </div>
              </div>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="exampleFormControlTextarea1">
                Resumen Noticia
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="resumenNoticia"
                onChange={onChange}
                value={resumenNoticia}
              ></textarea>
            </div>
            <Editor
              name="contenidoHTML"
              initialValue="<p>Escriba Aqui El Contenido HTML</p>"
              apiKey="fv7y0v7zmolrwsmqnq8h97511go2f8231u9n833zvht6sc2z"
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                                     alignleft aligncenter alignright alignjustify | \
                                     bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
              onChange={onChange}
            />
            <div class="input-gropu mt-3">
              <h1 className="text-center">Seleccione Una Empresa</h1>
              <select class="form-control" name="idEmpresa" onChange={onChange}>
                {empresas.map((empresa) => (
                  <option value={empresa.id_empresa}>
                    {empresa.denominacion}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-success mt-5 btn-block" type="submit">
              Agregar Noticia
            </button>
            <Link to="/lista-noticias">
              {" "}
              <button className="btn btn-danger mt-3 btn-block">
                Cancelar/Volver
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevaNoticia;
