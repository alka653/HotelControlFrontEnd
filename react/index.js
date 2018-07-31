import React from 'react'
import ReactDOM from 'react-dom'
import Home from './routes/Home.js'
import Area from './routes/Area.js'
import Login from './routes/Login.js'
import ConfiguracionArea from './routes/ConfiguracionArea.js'
import { HashRouter as Router, Route } from 'react-router-dom'
import ConfiguracionCostoConsumo from './routes/ConfiguracionCostoConsumo.js'
import HandleError from './error/containers/handleError'

ReactDOM.render(
	<HandleError>
		<Router>
			<div>
				<Route exact path='/' component={Home} />
				<Route path='/area/:slug_area' component={Area} />
				<Route exact path='/configuracion-area' component={ConfiguracionArea} />
				<Route exact path='/configuracion-costo-consumo' component={ConfiguracionCostoConsumo} />
				<Route exact path='/ingresar' component={Login} />
			</div>
		</Router>
	</HandleError>
, document.getElementById('app'))
