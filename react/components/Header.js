import { HashRouter as Router, Route } from 'react-router-dom'
import { getIdToken, logout } from '../services/PostData.js'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Header extends React.Component {
	state = {
		user: ''
	}
	componentDidMount(){
		this.setState({
			user: getIdToken('nombre')
		})
	}
	handleCloseSession = () => {
		logout()
		window.location.reload()
	}
	render(){
		return (
			<nav key="0.0" className="navbar-default navbar-static-top" role="navigation">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<h1>
						<Link to={"/"} className="navbar-brand">
							HotelControl
						</Link>
					</h1>
				</div>
				<div className="border-bottom">
					<div className="full-left">
						<h3 id="title"></h3>
					</div>
					<div className="drop-men">
						<ul className="nav_1" style={{ padding: 20, marginRight: 50 }}>
							<li className="dropdown">
								<a className="dropdown-toggle dropdown-at" data-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer' }}>
									<span className="name-caret">
										{this.state.user}
										<i className="caret"></i>
									</span>
								</a>
								<ul className="dropdown-menu " role="menu">
									<li>
										<a onClick={this.handleCloseSession} style={{ padding: 0, cursor: 'pointer' }}>
											<i className="fa fa-sign-in nav_icon"></i> Cerrar sesión
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div className="clearfix"></div>
					<div className="navbar-default sidebar">
						<div className="sidebar-nav navbar-collapse">
							<ul className="nav" id="side-menu">
								<li>
									<Link to="/" className="hvr-bounce-to-right">
										<i className="fa fa-dashboard nav_icon"></i>
										<span className="nav-label">Inicio</span>
									</Link>
								</li>
								<li>
									<Link to="/configuracion-area" className="hvr-bounce-to-right">
										<i className="fa fa-check-square-o nav_icon"></i>
										Configuración de área
									</Link>
								</li>
								<li>
									<Link to="/configuracion-costo-consumo" className="hvr-bounce-to-right">
										<i className="fa fa-pencil nav_icon"></i>
										Costo de consumo
									</Link>
								</li>
								<li>
									<Link to="#" className="hvr-bounce-to-right">
										<i className="fa fa-file-o nav_icon"></i> <span className="nav-label">Reportes</span><span className="fa arrow"></span>
									</Link>
									<ul className="nav nav-second-level">
										<li>
											<Link to="/reporte-mensual" className="hvr-bounce-to-right">
												<i className="fa fa-arrow-right nav_icon"></i>Reporte Mensual
											</Link>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		)
	}
}