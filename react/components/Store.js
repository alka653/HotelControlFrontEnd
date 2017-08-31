import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import React from 'react'

export default class Store extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
			<div>
				<Header />
				<div className="page-wrapper">
					<div className="container-fluid">
						<h1>Que hace</h1>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}