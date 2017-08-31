import { Link } from 'react-router-dom'
import React from 'react'

export default class HeaderLeft extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
			<aside className="left-sidebar">
				<div className="scroll-sidebar">
					<nav className="sidebar-nav">
						<ul id="sidebarnav">
							<li>
								<Link to="/" className="waves-effect" id="home-link">
									<i className="fa fa-home m-r-10" aria-hidden="true"></i> Inicio
								</Link>
							</li>
							<li>
								<Link to="/store" className="waves-effect" id="store-link">
									<i className="fa fa-list-alt m-r-10" aria-hidden="true"></i> Store
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</aside>
		)
	}
}