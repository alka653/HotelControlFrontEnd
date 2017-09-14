import BoxAvgService from '../components/BoxAvgService.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
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
		let style = {
			display: 'block'
		}
		$.get(server_url+"area", function(response){
			$.each(response, function(index, value){
				$.each(value, function(_index, _value){
					let sensores = _value.consumo_tolerable.map(function(val, key){
						return (
							<div className="col-md-6 text-center" key={key}>
								<img className="icon-service" src={ base_url+"assets/img/"+val.tipo_sensor.slug_tipo+".png" }/>
								<BoxAvgService data_sensor={val} slug_area={_value.slug_area} style={style} key={key} />
							</div>
						)
					})
					content.push(
						<Link to={"/area/"+_value.slug_area} className="col-md-4" key={_index} id="store-link">
							<div className="card">
								<div className="card-block row">
									<div className="col-md-5">
										<h3 className="font-normal">{ _value.nombre_area }</h3>
									</div>
									<div className="col-md-7 row text-center">
										{sensores}
									</div>
								</div>
							</div>
						</Link>
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