import React from 'react'
import ReactDOM from 'react-dom'
import Home from './routes/Home.js'
import Area from './routes/Area.js'
import Login from './routes/Login.js'
import ReporteMensual from './routes/ReporteMensual.js'
import ConfiguracionArea from './routes/ConfiguracionArea.js'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import ConfiguracionCostoConsumo from './routes/ConfiguracionCostoConsumo.js'
import HandleError from './error/containers/handleError'
import { isLoggedIn } from './services/PostData'

ReactDOM.render(
	<HandleError>
		<Router>
			<div>
				<Route exact path='/' render={() => (
					isLoggedIn() ? (
						<Home />
					): (
						<Redirect to="/ingresar" />
					)
				)} />
				<Route path='/area/:slug_area' render={props => (
					isLoggedIn() ? (
						<Area {...props} />
					): (
						<Redirect to="/ingresar" />
					)
				)} />
				<Route exact path='/configuracion-area' render={() => (
					isLoggedIn() ? (
						<ConfiguracionArea />
					): (
						<Redirect to="/ingresar" />
					)
				)} />
				<Route exact path='/configuracion-costo-consumo' render={() => (
					isLoggedIn() ? (
						<ConfiguracionCostoConsumo />
					): (
						<Redirect to="/ingresar" />
					)
				)} />
				<Route exact path='/reporte-mensual' render={() => (
					isLoggedIn() ? (
						<ReporteMensual />
					): (
						<Redirect to="/ingresar" />
					)
				)} />
				<Route exact path='/ingresar' render={() => (
					isLoggedIn() ? (
						<Home />
					): (
						<Login />
					)
				)} />
			</div>
		</Router>
	</HandleError>
, document.getElementById('app'))
