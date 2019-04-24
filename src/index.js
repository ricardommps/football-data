// Babel polyfill
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {createBrowserHistory} from 'history';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import store from './store';
import * as serviceWorker from './serviceWorker';
import routes from './routes';

import App from './app/App';


// Render do App
console.log(">>PUBLIC_URL",process.env.PUBLIC_URL)
const basename = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';
const history = createBrowserHistory();

const Root = (
	<Provider store={store}>
		<div>
			<BrowserRouter basename={basename}>
				<div>
					<Switch>
						{routes.map(route => (
							<Route
								key={route.path}
								path={route.path}
								component={route.component}
							/>
						))}
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	</Provider>
);
ReactDOM.render(Root, document.getElementById('root'));

// Config service worker
serviceWorker.unregister();
