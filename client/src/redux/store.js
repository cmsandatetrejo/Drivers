import { createStore, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const composeEnhacer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
//esta linea sirve para conectar nuestra APP  con la extension REDUX DEVTOOLS DEL NAVEGADOR

const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(ThunkMiddleware))
    //esta linea sirve para que podamos hacer peticiones a una Api/servidor 
);

export default store;