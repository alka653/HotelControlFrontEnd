import openSocket from 'socket.io-client'
import React from 'react'

export default class BoxAvgService extends React.Component {
	constructor(){
		super()
		this.state = {
			consumo_promedio: '0'
		}
	}
	convertConsumo(json_val, key){
		return JSON.parse(json_val)[key]
	}
	componentDidMount(){
		let socket = openSocket('http://localhost:5000/area/promedio/'+this.props.data_sensor.tipo_sensor.slug_tipo+'/'+this.props.slug_area)
		this.setState({
			consumo_promedio: this.convertConsumo(this.props.data_sensor.tipo_sensor.consumo_promedio, 'consumo_promedio_dia')
		})
		socket.on('consumoPromedioGeneral', value => {
			this.setState({
				consumo_promedio: this.convertConsumo(value, 'consumo_promedio_dia')
			})
		})
	}
	render(){
		return <b style={this.props.style}>{this.state.consumo_promedio}</b>
	}
}