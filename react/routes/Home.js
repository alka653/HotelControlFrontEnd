import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import BoxAvgService from '../components/BoxAvgService.js'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Home extends React.Component {
	constructor(){
		super()
		this.state = {
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
		let _this = this
		let content = []
		$.get(server_url+"area", function(response){
			$.each(response, function(index, value){
				$.each(value, function(_index, _value){
					let sensores = _value.consumo_tolerable.map(function(val, key){
						return <BoxAvgService data_sensor={val} slug_area={_value.slug_area} key={key} />
					})
					content.push(
						<div className="col-md-4" key={_index}>
							<div className="card">
								<div className="card-block row">
									<div className="col-md-6">
										<h3 className="font-normal">{ _value.nombre_area }</h3>
									</div>
									<div className="col-md-6 row text-center">
										{sensores}
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
							{ this.state.lista_areas }
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}