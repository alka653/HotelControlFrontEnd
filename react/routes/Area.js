import FormSensor from '../components/elements/FormSensor.js'
import BoxAvgService from '../components/BoxAvgService.js'
import GraphSensor from '../components/GraphSensor.js'
import ModalForm from '../components/ModalForm.js'
import { Link, Redirect } from 'react-router-dom'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'

const divLoading = [
	<div key="0" className="col-md-12 text-center">
		<div className="card">
			<div className="card-block">
				<h3 className="font-normal">Cargando gráficas...</h3>
			</div>
		</div>
	</div>
]

export default class Area extends Component {
	state = {
		verifyConsumoTolerable: 'hide',
		metrica: divLoading,
		sensor_general: '',
		slug_area: '',
		nombre_area: '',
		showModal: false,
		titleModal: '',
		btnAction: [],
		args: {}
	}
	componentDidMount(){
		this.show_sensor()
	}
	FormSensor = (event) => {
		this.setState({
			showModal: true,
			titleModal: 'Agregar sensor al área'
		})
	}
	changeState = (event) => {
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: `${server_url}area/estado`,
			dataType: "json",
			data: `{"estado_id": "${event.target.getAttribute('data-state')}", "slug_area": "${event.target.getAttribute('data-slug')}"}`,
			success: function(response){
				alert(response['response'])
				window.location.reload()
			}
		})
	}
	saveAction = (content_data) => {
		let _this_ = this
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: `${server_url}area/${content_data['slug_area']}/sensor/guardar`,
			dataType: "json",
			data: `{"identificacion_sensor": "${content_data['identificacion_sensor']}", "tipo_sensor": "${content_data['tipo_sensor']}", "slug_area": "${content_data['slug_area']}"}`,
			success: function(response){
				_this_.setState({
					showModal: false
				})
				alert(response['response'])
				window.location.reload()
			}
		})
		return false
	}
	viewConsumoTolerable = (data) => {
		let content = []
		let verifyConsumoTolerable = ''
		let _this_ = this
		let style = {
			fontSize: 25
		}
		if('consumo_tolerable' in data){
			$.each(data.consumo_tolerable, function(index, value){
				content.push(
					<div key={index} className="col-md-6" style={{marginBottom: 5}}>
						<div className="row">
							<div className="col-md-2 text-center">
								<img style={{ width: 50 }} src={ `${base_url}assets/img/${value.slug_tipo}.png` }/>
							</div>
							<div className="col-md-10">
								<div className="blank-page">
									<div style={{ padding: 10 }}>
										<BoxAvgService data_sensor={value} slug_area={value.slug_area} style={style} type="area" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			})
			if(Object.keys(data.consumo_tolerable).length > 1){
				verifyConsumoTolerable = 'hide'
			}
		}
		_this_.setState({
			verifyConsumoTolerable: verifyConsumoTolerable
		})
		return content
	}
	viewSensorGraph = (sensores) => {
		let content = []
		if(sensores != null && Object.keys(sensores).length){
			$.each(sensores, function(index, value){
				content.push(
					<div className="col-md-12" key={index} style={{marginBottom: 5}}>
						<GraphSensor value={value} />
					</div>
				)
			})
		}
		return content
	}
	show_sensor = () => {
		let _this = this
		$.get(`${server_url}area/false?slug_area=${this.props.match.params.slug_area}`, function(response){
			let value = response.object[0]
			ReactDOM.render(<span>{ value.nombre_area }</span>, document.getElementById('title'))
			_this.setState({
				slug_area: value.slug_area,
				nombre_area: value.nombre_area,
				sensor_general: _this.viewConsumoTolerable(value),
				metrica: _this.viewSensorGraph(value.sensores),
				btnAction: value.estado_id == 1 ? [
						<Button key={value.estado_id} bsStyle="danger" onClick={_this.changeState} data-state={2} data-slug={_this.props.match.params.slug_area}>Desactivar área</Button>
					]: [
						<Button key={value.estado_id} bsStyle="success" onClick={_this.changeState} data-state={1} data-slug={_this.props.match.params.slug_area}>Activar área</Button>
					],
				args: {
					'slug_area': value.slug_area,
					'nombre_area': value.nombre_area
				}
			})
		})
	}
	render(){
		let modalClose = () => this.setState({showModal: false})
		return (
			<div id="wrapper">
				<Header />
				<div id="page-wrapper" className="gray-bg dashbard-1">
					<div className="content-main">
						<div className="blank">
							<div className="row text-center">
								<Button bsStyle="info" onClick={this.FormSensor} data-slug={this.props.match.params.slug_area}>Agregar sensor</Button>
								{this.state.btnAction}
							</div>
							<div className="row">
								{ this.state.sensor_general }
								{ this.state.metrica }
							</div>
						</div>
					</div>
					{
						this.state.showModal &&
						<ModalForm handleShow={this.state.showModal} title={this.state.titleModal} handleClose={modalClose}>
							<FormSensor saveEvent={this.saveAction} args={this.state.args} />
						</ModalForm>
					}
					<Footer />
				</div>
			</div>
		)
	}
}