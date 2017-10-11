import openSocket from 'socket.io-client'
import '../../assets/js/jquery.flot'
import '../../assets/js/jquery.flot.tooltip.min'
import '../../assets/js/jquery.flot.time'
import React from 'react'

let plotObj
let content_data = []
let options = {
	series: {
		lines: {
			show: true
		},
		points: {
			show: true
		}
	},
	grid: {
		color: "#AFAFAF",
		hoverable: true,
		borderWidth: 0,
		backgroundColor: '#FFF'
	},
	tooltip: {
		show: true,
	},
	xaxis: {
		mode: "time"
	}
}

export default class GraphSensor extends React.Component {
	constructor(){
		super()
		this.state = {
			identificador: '0'
		}
	}
	componentWillMount(){
		let _this = this
		_this.setState({
			identificador: _this.props.value.identificacion_sensor,
			tipo: _this.props.value.tipo_sensor
		})
	}
	componentDidMount(){
		let _this = this
		let data = []
		$.get(server_url+"sensor/"+_this.state.identificador+"/consumo-dia", function(response){
			data = _this.objectData(response)
			$.plot($("#chartSensor-"+_this.state.identificador), [_this.seriesObj(data)], options)
		})
		let socket_graph_sensor = openSocket.connect('http://localhost:5000/sensor/consumo/'+_this.state.identificador)
		socket_graph_sensor.on('consumoGraficoReal', value => {
			_this.refreshDataGraph(_this.objectData(value))
		})
	}
	objectData(response){
		let data = []
		$.each(response, function(index, value){
			$.each(value, function(_index, _value){
				data.push([new Date(_value.fecha), _value.medida_sensor])
			})
		})
		return data
	}
	refreshDataGraph(data){
		$.plot($("#chartSensor-"+this.state.identificador), [this.seriesObj(data)], options)
	}
	seriesObj(data){
		return {
			data: data,
			label: "Medida sensor "+this.state.identificador+". Tipo "+this.state.tipo,
		}
	}
	render(){
		return (
			<div className="card">
				<div className="card-block">
					<div id={"chartSensor-"+this.state.identificador} style={{width: window.innerWidth - 360, height: 250}}></div>
				</div>
			</div>
		)
	}
}