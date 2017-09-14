import BoxAvgService from '../components/BoxAvgService.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Link } from 'react-router-dom'
import '../../assets/js/jquery.flot'
import '../../assets/js/jquery.flot.tooltip.min'
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
		let sin = [], cos = [];
		let offset = 0
		for (let i = 0; i < 12; i += 0.2) {
			sin.push([i, Math.sin(i + offset)]);
			cos.push([i, Math.cos(i + offset)]);
		}
		let options = {
			series: {
				lines: {
					show: true
				},
				points: {
					show: true
				}
			},
			colors: ["#009efb", "#55ce63"],
			grid: {
				color: "#AFAFAF",
				hoverable: true,
				borderWidth: 0,
				backgroundColor: '#FFF'
			},
			tooltip: {
				show: true,
			}
		};
		let plotObj = $.plot($("#flot-line-chart"), [{
			data: sin,
			label: "sin(x)",
		}, {
			data: cos,
			label: "cos(x)"
		}], options);
	}
	show_sensor(){
		let _this = this
		let content = []
		let style = {
			fontSize: 25
		}
		$.get(server_url+"area?slug_area="+this.props.match.params.slug_area, function(response){
			let value = response.object[0]
			$.each(value.consumo_tolerable, function(index, _value){
				content.push(
					<div key={index} className="col-md-6">
						<div className="row">
							<div className="col-md-2 text-center">
								<img style={{ width: 50 }} src={ base_url+"assets/img/"+_value.tipo_sensor.slug_tipo+".png" }/>
							</div>
							<div className="col-md-10">
								<div className="card">
									<div className="card-block" style={{ padding: 10 }}>
										<div className="row text-center">
											<div className="col-md-6">
												<p style={{ marginBottom: 0 }}>Consumo promedio día</p>
												<BoxAvgService data_sensor={_value} slug_area={value.slug_area} style={style} />
											</div>
											<div className="col-md-6 text-center">
												<p style={{ marginBottom: 0 }}>Consumo máximo</p>
												<b style={style}>0</b>
											</div>
											<div className="col-md-6 text-center">
												<p style={{ marginBottom: 0 }}>Consumo mensual</p>
												<b style={style}>0</b>
											</div>
											<div className="col-md-6">
												<p style={{ marginBottom: 0 }}>Costo consumo</p>
												<b style={style}>$ 50.000</b>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			})
			_this.setState({
				slug_area: value.slug_area,
				nombre_area: value.nombre_area,
				sensor_general: content
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
							{ this.state.sensor_general }
							{ this.state.metrica }
							<div className="col-md-12">
								<div className="card">
									<div className="card-block">
										<div id="flot-line-chart" style={{width: window.innerWidth - 360, height: 250}}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}