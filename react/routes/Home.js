import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
//import { subscribeToTimer } from '../components/Api.js'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000/area/promedio')
import { Link } from 'react-router-dom'
import React from 'react'

export default class Home extends React.Component {
	constructor(){
		super()
		this.state = {
			timestamp: 'Cargando',
			lista_areas: [
				<div key="0" className="col-md-12 text-center">
					<div className="card">
						<div className="card-block">
							<h3 className="font-normal">Cargando áreas...</h3>
						</div>
					</div>
				</div>
			]
		}
	}
	componentDidMount(){
		socket.on('timer', timestamp => {
			this.setState({
				timestamp: timestamp
			})
		})
		let _this = this;
		let content = [];
		$.get(server_url+"area", function(response){
			$.each(response, function(index, value){
				$.each(value, function(_index, _value){
					content.push(
						<div className="col-md-4" key={_index}>
							<div className="card">
								<div className="card-block row">
									<div className="col-md-6">
										<h3 className="font-normal">{ _value.nombre_area }</h3>
									</div>
									<div className="col-md-6 row text-center">
										{ _value.consumo_tolerable.map((__value, __index) => {
											return(
												<div className="col-md-6" key={ __index }>
													<img className="icon-service" src={ base_url+"assets/img/"+__value.tipo_sensor.slug_tipo+".png" } alt={_value.slug_area} />
													<b>18.9</b>
												</div>
											)
										}) }
									</div>
								</div>
							</div>
						</div>
					)
				})
			})
			_this.setState({
				lista_areas: content
			});
		})
	}
	render(){
		return (
			<div>
				<Header />
				<div className="page-wrapper">
					<div className="container-fluid">
						<div className="row">
							{ this.state.timestamp }
							{ this.state.lista_areas }
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}