import FormCostoConsumo from '../components/elements/FormCostoConsumo.js'
import ModalForm from '../components/ModalForm.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'

export default class ConfiguracionCostoConsumo extends React.Component {
	state = {
		lista_configuracion_consumo: [
			<div key="0" className="text-center">
				Cargando datos...
			</div>
		],
		showModal: false,
		typeModel: '',
		btn: 'hide',
		data: {},
		args: {}
	}
	styleTable = () => {
		// Pone el estilo datatable a la tabla creada
		$('.table').DataTable({
			responsive: true,
			language: languageDataTable,
			order: [
				[5, 'DESC']
			]
		})
	}
	saveAction = (content_data) =>{
		const _this_ = this
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: server_url+"configuracion/precio-consumo"+(content_data['id'] != "" ? "/"+content_data['id']: ""),
			dataType: "json",
			data: '{"mes":"' + content_data['mes']+ '", "tipo_sensor":"' + content_data['tipo_sensor']+ '", "precio_base":"' + content_data['precio_base']+ '"}',
			success: function(response){
				_this_.setState({
					showModal: false
				})
				alert(response['response'])
				_this_.loadData()
			}
		})
	}
	formCostoConsumo = () => {
		this.setState({
			btn: 'hide',
			showModal: true,
			typeModel: 'costo_consumo_form',
			titleModal: 'Agregar costo de consumo',
			args: {}
		})
	}
	updateFormCostoConsumo = (event) => {
		this.setState({
			btn: '',
			showModal: true,
			typeModel: 'costo_consumo_form_update',
			titleModal: 'Editar costo de consumo',
			args: this.state.data[event.target.getAttribute('data-id')]
		})
	}
	deleteCostoConsumo = (event) => {
		const _this_ = this
		$.get(server_url+'configuracion/precio-consumo/'+event.target.getAttribute('data-id')+'/eliminar', function(response){
			alert(response['response'])
			_this_.loadData()
		})
	}
	loadData = () => {
		const _this_ = this
		$.get(server_url+'configuracion/precio-consumo', function(data_table){
			data_table = data_table.object
			_this_.setState({
				data: data_table,
				lista_configuracion_consumo: [
					<table key="0.0.0.0" className="table table-bordered table-hover">
						<thead>
							<tr>
								<th>Mes</th>
								<th>Tipo de recurso</th>
								<th>Precio base</th>
								<th>Cantidad consumida</th>
								<th>Costo de consumo</th>
								<th>Fecha de ingreso</th>
								<th>Acción</th>
							</tr>
						</thead>
						<tbody>
							{
								Object.keys(data_table).map(function(key, index){
									const value = data_table[key]
									return(
										<tr key={key}>
											<td>{value['mes']['nombre_mes']}</td>
											<td>{value['tipo_sensor']['nombre_tipo']}</td>
											<td>{(value['precio_base']).format(2)}</td>
											<td>0</td>
											<td>0</td>
											<td>{value['fecha_ingreso']}</td>
											<td>
												<Button bsStyle="success" className="btn-sm" onClick={_this_.updateFormCostoConsumo} data-id={value['id']}>Editar</Button>
												<Button bsStyle="danger" className="btn-sm" onClick={_this_.deleteCostoConsumo} data-id={value['id']}>Eliminar</Button>
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				]
			})
			// Pone el estilo datatable a la tabla creada
			_this_.styleTable()
		})
	}
	componentDidMount(){
		this.loadData()
	}
	render(){
		const modalClose = () => this.setState({showModal: false})
		return (
			<div id="wrapper">
				<Header />
				<div id="page-wrapper" className="gray-bg dashbard-1">
					<div className="content-main">
						<div className="text-center">
							<Button bsStyle="success" onClick={this.formCostoConsumo}>Agregar costo de consumo</Button>
						</div>
						<div className="blank">
							<div className="blank-page">
								{ this.state.lista_configuracion_consumo }
							</div>
						</div>
					</div>
					{
						this.state.showModal &&
						<ModalForm handleShow={this.state.showModal} title={this.state.titleModal} handleClose={modalClose}>
							<FormCostoConsumo saveEvent={this.saveAction} args={this.state.args} btn={this.state.btn} />
						</ModalForm>
					}
					<Footer />
				</div>
			</div>
		)
	}
}