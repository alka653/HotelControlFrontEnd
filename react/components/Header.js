import { HashRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Header extends React.Component {
	constructor(){
		super()
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
										<i className="fa fa-check-square-o nav_icon"></i>
										Costo de consumo
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		)
	}
}