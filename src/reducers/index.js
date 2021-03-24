import { combineReducers } from 'redux';
import empresasReducer from './empresasReducer';
import noticiasReducer from './noticiasReducer';

export default combineReducers({

    empresas: empresasReducer,
    noticias: noticiasReducer
});