import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './components/reducers';
import App from './App';
import './Styles/font-awesome/css/font-awesome.min.css';
import './Styles/style.css';

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
