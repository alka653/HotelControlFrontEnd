import { Link } from 'react-router-dom'
import React from 'react'

export default class HeaderTop extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
			<div classname="navbar-header">
				<nav className="navbar top-navbar navbar-toggleable-sm navbar-light">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">
							<b className="b">
								<img src="assets/img/logo-sm.png" alt="HotelControl" height="34" className="dark-logo" />
								
							</b>
							<span className="span">
								<img src="assets/img/logo.png" alt="HotelControl" height="45" className="dark-logo" />
							</span>
						</Link>
					</div>
					<div className="navbar-collapse">
						<ul className="navbar-nav mr-auto mt-md-0 ">
							<li className="nav-item"> <a className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}