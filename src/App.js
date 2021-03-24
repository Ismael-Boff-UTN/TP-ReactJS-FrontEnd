//Componentes
import ListadoEmpresas from './components/ListadoEmpresas';
import NuevaEmpresa from './components/NuevaEmpresa';
import EditarEmpresa from './components/EditarEmpresa';
import EditarNoticia from './components/EditarNoticia';
import NuevaNoticia from './components/NuevaNoticia';
import HomeEmpresa from './components/HomeEmpresa';
import ListadoNoticias from './components/ListadoNoticias';
import NoticiaDetalles from './components/NoticiaDetalles';
//React Router DOM
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//REDUX
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={ListadoEmpresas} />
          <Route exact path="/nueva-empresa" component={NuevaEmpresa} />
          <Route exact path="/editar-empresa/:id" component={EditarEmpresa} />
          <Route exact path="/editar-noticia/:id" component={EditarNoticia} />
          <Route exact path="/nueva-noticia" component={NuevaNoticia} />
          <Route exact path="/home/:id" component={HomeEmpresa} />
          <Route exact path="/lista-noticias" component={ListadoNoticias} />
          <Route exact path="/noticia-detalles/:id" component={NoticiaDetalles} />
          <Route exact path="/home/noticia-detalles/:id" component={NoticiaDetalles} />
        </Switch>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
