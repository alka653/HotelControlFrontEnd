import ModalForm from '../components/ModalForm.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'

export default class ConfiguracionCostoConsumo extends React.Component {
	constructor(){
		super()
		this.state = {
			lista_configuracion_consumo: [
				<div key="0" className="text-center">
					Cargando datos...
				</div>
			],
			showModal: false,
			typeModel: 'costo_consumo_form',
			args: {}
		}
		this.FormCostoConsumo = this.FormCostoConsumo.bind(this)
	}
	styleTable(){
		// Pone el estilo datatable a la tabla creada
		$('.table').DataTable({
			responsive: true,
			language: languageDataTable
		})
	}
	saveAction(content_data){
		let _this_ = this
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: server_url+"configuracion/precio-consumo",
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
	FormCostoConsumo(){
		this.setState({
			showModal: true,
			titleModal: 'Agregar costo de consumo'
		})
	}
	loadData(){
		let _this = this;
		$.get(server_url+'configuracion/precio-consumo', function(data_table){
			data_table = data_table.object
			_this.setState({
				// Cambia el valor de la variable de estado inicial
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
							{data_table.map((value, index) => {
								return(
									<tr key={index}>
										<td>{value.mes}</td>
										<td>{value.tipo_sensor.nombre_tipo}</td>
										<td>{(value.precio_base).format(2)}</td>
										<td>0</td>
										<td>0</td>
										<td>{value.fecha_ingreso}</td>
										<td></td>
									</tr>
								);
							})}
						</tbody>
					</table>
				]
			})
			// Pone el estilo datatable a la tabla creada
			_this.styleTable()
		})
	}
	componentDidMount(){
		this.loadData()
	}
	render(){
		let modalClose = () => this.setState({showModal: false})
		return (
			<div id="wrapper">
				<Header />
				<div id="page-wrapper" className="gray-bg dashbard-1">
					<div className="content-main">
						<div className="text-center">
							<Button bsStyle="success" onClick={this.FormCostoConsumo}>Agregar costo de consumo</Button>
						</div>
						<div className="blank">
							<div className="blank-page">
								{ this.state.lista_configuracion_consumo }
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