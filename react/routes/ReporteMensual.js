import '../../assets/js/jquery.flot'
import '../../assets/js/jquery.flot.tooltip.min'
import '../../assets/js/jquery.flot.time'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Link } from 'react-router-dom'
import React from 'react'

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

export default class ReporteMensual extends React.Component {
	state = {
		fecha_inicio: '',
		fecha_cierre: '',
		show_box_report: false
	}
	handleSendReport = () => {
		const _this_ = this
		_this_.setState({
			show_box_report: false
		})
		$.get(`${server_url}reporte/consumo-mensual/${_this_.state.fecha_inicio}/${_this_.state.fecha_cierre}`, function(response){
			let data = []
			$.each(response, function(index, value){
				let data_item = []
				$.each(value['data'], function(_index, _value){
					const consumo = value['label'] != 'agua' ? (parseFloat(_value[Object.keys(_value)]) / 1000): parseFloat(_value[Object.keys(_value)]);
					const split_time = Object.keys(_value)[0].split(":")
					data_item.push([new Date(Date.UTC(split_time[0], (parseInt(split_time[1]) - 1), (parseInt(split_time[2])))), consumo])
				})
				value['data'] = data_item
				data.push(value)
			})
			_this_.setState({
				show_box_report: true
			})
			$.plot($("#chartSensor"), data, options)
		})
	}
	handleChange = (e) => {
		let data = []
		if(e.target.validity.valid){
			data[e.target.name] = e.target.value
			this.setState(data)
		}
	}
	render(){
		return (
			<div id="wrapper">
				<Header />
				<div id="page-wrapper" className="gray-bg dashbard-1">
					<div className="content-main">
						<div className="blank">
							<div className="blank-page">
								<h3 className="font-normal">Reporte de consumo mensual</h3>
								<hr/>
								<form>
									<div className="row">
										<div className="col-md-6">
											<FormGroup>
												<ControlLabel>Fecha inicio</ControlLabel>
												<FormControl type="date" name="fecha_inicio" placeholder="2018/08/11" onChange={this.handleChange} /><FormControl.Feedback />
											</FormGroup>
										</div>
										<div className="col-md-6">
											<FormGroup>
												<ControlLabel>Fecha cierre</ControlLabel>
												<FormControl type="date" name="fecha_cierre" placeholder="2018/09/11" onChange={this.handleChange} /><FormControl.Feedback />
											</FormGroup>
										</div>
									</div>
									<div className="text-center">
										<Button bsStyle="success" onClick={this.handleSendReport}>Consultar datos</Button>
									</div>
								</form>
							</div>
							<br />
							{
								this.state.show_box_report &&
								<div className="blank-page">
									<div id="chartSensor" style={{width: window.innerWidth - 360, height: 250}}></div>
								</div>
							}
						</div>
					</div>
					<Footer />
				</div>
			</div>
		)
	}
}