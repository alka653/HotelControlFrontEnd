import BoxAvgService from '../components/BoxAvgService.js'
import GraphSensor from '../components/GraphSensor.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Area extends React.Component {
	constructor(){
		super()
		this.state = {
			metrica: [
				<div key="0" className="col-md-12 text-center">
					<div className="card">
						<div className="card-block">
							<h3 className="font-normal">Cargando gráficas...</h3>
						</div>
					</div>
				</div>
			],
			sensor_general: '',
			slug_area: '',
			nombre_area: ''
		}
	}
	componentDidMount(){
		this.show_sensor()
	}
	viewConsumoTolerable(data){
		let content = []
		let style = {
			fontSize: 25
		}
		$.each(data.consumo_tolerable, function(index, value){
			content.push(
				<div key={index} className="col-md-6">
					<div className="row">
						<div className="col-md-2 text-center">
							<img style={{ width: 50 }} src={ base_url+"assets/img/"+value.tipo_sensor.slug_tipo+".png" }/>
						</div>
						<div className="col-md-10">
							<div className="card">
								<div className="card-block" style={{ padding: 10 }}>
									<BoxAvgService data_sensor={value} slug_area={value.slug_area} style={style} type="area" />
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		})
		return content
	}
	viewSensorGraph(sensores){
		let content = []
		$.each(sensores, function(index, value){
			content.push(
				<div className="col-md-12" key={index}>
					<GraphSensor value={value} />
				</div>
			)
		})
		return content
	}
	show_sensor(){
		let _this = this
		$.get(server_url+"area?slug_area="+this.props.match.params.slug_area, function(response){
			let value = response.object[0]
			_this.setState({
				slug_area: value.slug_area,
				nombre_area: value.nombre_area,
				sensor_general: _this.viewConsumoTolerable(value),
				metrica: _this.viewSensorGraph(value.sensores)
			})
		})
	}
	render(){
		return (
			<div>
				<Header />
				<div className="page-wrapper">
					<div className="container-fluid">
						<div className="row">
							{ this.state.sensor_general }
							{ this.state.metrica }
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}