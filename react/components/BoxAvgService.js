import React from 'react'

const openSocket = require('socket.io-client')

export default class BoxAvgService extends React.Component {
	state = {
		consumo_promedio: '0',
		consumo_maximo: '0',
		consumo_mensual: '0'
	}
	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve)
		});
	}
	convertConsumo(json_val, key){
		let value = ''
		try{
			value = JSON.parse(json_val)[key]
		}catch(error){
			value = '0'
		}
		return value
	}
	componentWillMount(){
		this.setState({
			consumo_promedio: this.convertConsumo(this.props.data_sensor.consumo_promedio, 'consumo_promedio_dia'),
			consumo_maximo: this.convertConsumo(this.props.data_sensor.consumo_promedio, 'consumo_maximo_dia'),
			consumo_mensual: this.convertConsumo(this.props.data_sensor.consumo_promedio, 'consumo_promedio_mensual')
		})
		let socket_box_avg_service = openSocket(base_url+'area/promedio/'+this.props.data_sensor.slug_tipo+'/'+this.props.slug_area, { jsonp: false, transport: ['websocket'] })
		socket_box_avg_service.on('consumoPromedioGeneral', (value) => {
			this.setState({
				consumo_promedio: this.convertConsumo(value, 'consumo_promedio_dia'),
				consumo_maximo: this.convertConsumo(value, 'consumo_maximo_dia'),
				consumo_mensual: this.convertConsumo(value, 'consumo_promedio_mensual')
			})
		})
	}
	render(){
		switch(this.props.type){
			case 'home':
				return (
					<b style={this.props.style} key="0">{this.state.consumo_promedio}</b>
				)
				break
			case 'area':
				return (
					<div className="row text-center" key="0">
						<div className="col-md-6">
							<p style={{ marginBottom: 0 }}>Consumo promedio día</p>
							<b style={this.props.style}>{this.state.consumo_promedio}</b>
						</div>
						<div className="col-md-6 text-center">
							<p style={{ marginBottom: 0 }}>Consumo máximo</p>
							<b style={this.props.style}>{this.state.consumo_maximo}</b>
						</div>
						<div className="col-md-6 text-center">
							<p style={{ marginBottom: 0 }}>Consumo mensual</p>
							<b style={this.props.style}>{this.state.consumo_mensual}</b>
						</div>
					</div>
				)
				break
		}
	}
}