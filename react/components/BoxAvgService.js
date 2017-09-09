import openSocket from 'socket.io-client'
import React from 'react'

export default class BoxAvgService extends React.Component {
	constructor(){
		super()
		this.state = {
			consumo_promedio: '0',
			slug_area: '',
			slug_sensor: ''
		}
	}
	componentDidMount(){
		let socket = openSocket('http://localhost:5000/area/promedio/'+this.props.data_sensor.tipo_sensor.slug_tipo+'/'+this.props.slug_area)
		this.setState({
			consumo_promedio: this.props.data_sensor.tipo_sensor.consumo_promedio,
			slug_sensor: this.props.data_sensor.tipo_sensor.slug_tipo,
			slug_area: this.props.slug_area
		})
		socket.on('consumoPromedioGeneral', consumo_promedio => {
			this.setState({
				consumo_promedio: consumo_promedio
			})
		})
	}
	render(){
		return (
			<div className="col-md-6">
				<img className="icon-service" src={ base_url+"assets/img/"+this.props.data_sensor.tipo_sensor.slug_tipo+".png" }/>
				<b>{this.state.consumo_promedio}</b>
			</div>
		)
	}
}