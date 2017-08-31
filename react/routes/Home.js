import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Home extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
			<div>
				<Header />
				<div className="page-wrapper">
					<div className="container-fluid">
						<h1>Oe</h1>
						<Link to="/store">Store</Link>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}