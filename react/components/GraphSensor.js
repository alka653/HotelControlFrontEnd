import '../../assets/js/jquery.flot'
import '../../assets/js/jquery.flot.tooltip.min'
import '../../assets/js/jquery.flot.time'
import React, { Component } from 'react'

const openSocket = require('socket.io-client')

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

export default class GraphSensor extends Component {
	state = {
		identificador: this.props.value.identificacion_sensor,
		data_to_graph: [],
		last_date: ''
	}
	componentWillMount(){
		const _this = this
		_this.setState({
			tipo: _this.props.value.tipo_sensor
		})
	}
	componentDidMount(){
		const _this = this
		let data = []
		$.get(server_url+"sensor/"+_this.state.identificador+"/consumo-dia", function(response){
			data = _this.objectData(response)
			_this.refreshDataGraph(data)
		})
		//$.plot($("#chartSensor-"+_this.state.identificador), [_this.seriesObj(data)], options)
		let socket_graph_sensor = openSocket(server_url+'sensor/consumo/'+_this.state.identificador, { jsonp: false, transport: ['websocket'] })
		socket_graph_sensor.on('consumoGraficoReal', (value) => {
			//_this.objectData(value)
			const content_value = value.object
			if(content_value != null && Object.keys(content_value).length > 0){
				let data_to_append = _this.state.data_to_graph
				const split_time = content_value.fecha.split(":")
				if(_this.state.last_date == split_time[0]+':'+split_time[1]+':'+split_time[2]+':'+split_time[3]+':'+split_time[4]){
					data_to_append.data.pop()
				}
				data_to_append.data.push([new Date(Date.UTC(split_time[0], split_time[1], split_time[2], split_time[3], split_time[4])), content_value.medida_sensor])
				_this.setState({
					data_to_append: data_to_append,
					last_date: split_time[0]+':'+split_time[1]+':'+split_time[2]+':'+split_time[3]+':'+split_time[4]
				})
				console.log(data_to_append)
				_this.refreshDataGraph(data_to_append)
			}
		})
	}
	objectData(response){
		let data = []
		let last_date = ''
		const _this = this
		$.each(response, function(index, value){
			$.each(value, function(_index, _value){
				const split_time = _value.fecha.split(":")
				data.push([new Date(Date.UTC(split_time[0], split_time[1], split_time[2], split_time[3], split_time[4])), _value.medida_sensor])
				last_date = split_time[0]+':'+split_time[1]+':'+split_time[2]+':'+split_time[3]+':'+split_time[4]
			})
		})
		this.setState({
			data_to_graph: _this.seriesObj(data),
			last_date: last_date
		})
		return _this.seriesObj(data)
	}
	refreshDataGraph(data){
		$.plot($("#chartSensor-"+this.state.identificador), [data], options)
	}
	seriesObj(data){
		return {
			data: data,
			label: "Medida sensor "+this.state.identificador+". Tipo "+this.state.tipo,
		}
	}
	render(){
		return (
			<div className="blank-page">
				<div id={"chartSensor-"+this.state.identificador} style={{width: window.innerWidth - 360, height: 250}}></div>
			</div>
		)
	}
}