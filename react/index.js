import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './routes/Home.js'
import Area from './routes/Area.js'
import Configuracion from './routes/Configuracion.js'

ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={Home} />
			<Route path='/area/:slug_area' component={Area} />
			<Route exact path='/configuracion' component={Configuracion} />
		</div>
	</Router>
, document.getElementById('app'))
