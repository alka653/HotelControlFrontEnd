import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Configuracion extends React.Component {
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
		this.loadArea()
	}
	loadArea(){
		let content = []
		let _this = this
		$.get(server_url+"area", function(response){
			$.each(response, function(index, value){
				$.each(value, function(_index, _value){
					content.push(
						<Link to={"/area/"+_value.slug_area} className="col-md-4" key={_index} id="store-link">
							<div className="card">
								<div className="card-block row">
									<div className="col-md-7">
										<h3 className="font-normal">Área { _value.nombre_area }</h3>
									</div>
									<div className="col-md-5 text-center">
										<h5>{_value.total_sensores}</h5>
										<h5>Total sensores</h5>
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
							<Link to={"/"} className="col-md-4" key={0}>
								<div className="card card-gray">
									<div className="card-block text-center">
										<h3 className="font-normal">Registrar área</h3>
									</div>
								</div>
							</Link>
							{ this.state.lista_areas }
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}