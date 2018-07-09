import BoxAvgService from '../components/BoxAvgService.js'
import GraphSensor from '../components/GraphSensor.js'
import ModalForm from '../components/ModalForm.js'
import { Link, Redirect } from 'react-router-dom'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import React from 'react'

const divLoading = [
	<div key="0" className="col-md-12 text-center">
		<div className="card">
			<div className="card-block">
				<h3 className="font-normal">Cargando gráficas...</h3>
			</div>
		</div>
	</div>
]

export default class Area extends React.Component {
	constructor(){
		super()
		this.state = {
			verifyConsumoTolerable: 'hide',
			metrica: divLoading,
			sensor_general: '',
			slug_area: '',
			nombre_area: '',
			showModal: false,
			typeModel: '',
			titleModal: '',
			args: {}
		}
		this.FormConsumoTolerable = this.FormConsumoTolerable.bind(this)
		this.updateFormArea = this.updateFormArea.bind(this)
		this.FormSensor = this.FormSensor.bind(this)
		this.saveAction = this.saveAction.bind(this)
	}
	componentDidMount(){
		this.show_sensor()
	}
	FormConsumoTolerable(){
		this.setState({
			typeModel: 'consumo_tolerable_form',
			showModal: true,
			titleModal: 'Ingreso de consumo tolerable por área'
		})
	}
	updateFormArea(){
		this.setState({
			typeModel: 'area_edit_form',
			showModal: true,
			titleModal: 'Edición de área'
		})
	}
	FormSensor(){
		this.setState({
			typeModel: 'sensor_form',
			showModal: true,
			titleModal: 'Agregar sensor al área'
		})
	}
	saveAction(content_data){
		let _this_ = this
		switch(this.state.typeModel){
			case 'area_edit_form':
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					url: server_url+"area/actualizar/"+content_data['slug_area'],
					dataType: "json",
					data: '{"nombre_area":"' + content_data['nombre_area']+ '"}',
					success: function(response){
						_this_.setState({
							showModal: false
						})
						alert(response['response'])
						_this_.props.history.push('/area/'+response['slug_area'])
					}
				})
				break;
			case 'sensor_form':
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					url: server_url+"area/"+content_data['slug_area']+"/sensor/guardar",
					dataType: "json",
					data: '{"identificacion_sensor": "'+content_data['identificacion_sensor']+ '", "tipo_sensor": "'+content_data['tipo_sensor']+'", "slug_area": "'+content_data['slug_area']+'"}',
					success: function(response){
						_this_.setState({
							showModal: false
						})
						alert(response['response'])
						window.location.reload()
					}
				})
				break;
			case 'consumo_tolerable_form':
				console.log(content_data)
				break;
		}
		return false
	}
	viewConsumoTolerable(data){
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
								<img style={{ width: 50 }} src={ base_url+"assets/img/"+value.tipo_sensor.slug_tipo+".png" }/>
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
	viewSensorGraph(sensores){
		let content = []
		if(Object.keys(sensores).length){
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
	show_sensor(){
		let _this = this
		$.get(server_url+"area/false?slug_area="+this.props.match.params.slug_area, function(response){
			let value = response.object[0]
			ReactDOM.render(<span>{ value.nombre_area }</span>, document.getElementById('title'))
			_this.setState({
				slug_area: value.slug_area,
				nombre_area: value.nombre_area,
				sensor_general: _this.viewConsumoTolerable(value),
				metrica: _this.viewSensorGraph(value.sensores),
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
								<Button bsStyle="default" className={this.state.verifyConsumoTolerable} onClick={this.FormConsumoTolerable} data-slug={this.props.match.params.slug_area}>Ingreso de consumo tolerable</Button>
								<Button bsStyle="info" onClick={this.FormSensor} data-slug={this.props.match.params.slug_area}>Agregar sensor</Button>
								{/*
									<Button bsStyle="success" onClick={this.updateFormArea} data-slug={this.props.match.params.slug_area}>Editar área</Button>
								*/}
							</div>
							<div className="row">
								{ this.state.sensor_general }
								{ this.state.metrica }
							</div>
						</div>
					</div>
					<ModalForm handleShow={this.state.showModal} args={this.state.args} title={this.state.titleModal} typeModal={this.state.typeModel} handleClose={modalClose} saveEvent={this.saveAction} />
					<Footer />
				</div>
			</div>
		)
	}
}