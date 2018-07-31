import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import React from 'react'

export default class FormCostoConsumo extends React.Component {
	state = {
		id: '',
		mes: '',
		tipo_sensor: '',
		precio_base: '',
		btn_class: this.props.btn
	}
	componentDidMount(){
		const _this_ = this
		const args = this.props.args
		let data_mes = []
		let meses = {
			'1': 'Enero',
			'2': 'Febrero',
			'3': 'Marzo',
			'4': 'Abril',
			'5': 'Mayo',
			'6': 'Junio',
			'7': 'Julio',
			'8': 'Agosto',
			'9': 'Septiembre',
			'10': 'Octubre',
			'11': 'Noviembre',
			'12': 'Diciembre'
		}
		$.each(meses, function(index, value){
			data_mes.push(
				<option key={index} value={index}>{value}</option>
			)
		})
		$.get(server_url+"type-sensor", function(response){
			let data = []
			$.each(response.object, function(index, value){
				data.push(
					<option key={index} value={value.slug_tipo}>{value.nombre_tipo}</option>
				)
			})
			_this_.setState({
				data_tipo_sensor: data,
				data_mes: data_mes
			})
		})
		if(Object.keys(args).length !== 0){
			_this_.setState({
				mes: args.mes.id,
				tipo_sensor: args.tipo_sensor.slug_tipo,
				precio_base: args.precio_base,
				id: args.id
			})
		}
	}
	handleSendClick = () => {
		return this.props.saveEvent({'id': this.state.id, 'mes': this.state.mes, 'tipo_sensor': this.state.tipo_sensor, 'precio_base': this.state.precio_base})
	}
	handleChange = (e) => {
		let data = []
		if(e.target.validity.valid){
			data[e.target.name] = e.target.value
			this.setState(data)
		}
		if(e.target.name == 'precio_base'){
			if(this.state.precio_base != '' && e.target.value != ''){
				this.setState({
					btn_class: ''
				})
			}
		}
	}
	render(){
		return (
			<div>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Mes a ingresar</ControlLabel>
							<FormControl componentClass="select" name="mes" id="formMes" value={this.state.mes} placeholder="Seleccione una opción" onChange={this.handleChange}>
								<option value="">Seleccione una opción</option>
								{this.state.data_mes}
							</FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Tipo de sensor</ControlLabel>
							<FormControl componentClass="select" name="tipo_sensor" id="formTipoSensor" value={this.state.tipo_sensor} placeholder="Seleccione una opción" onChange={this.handleChange}>
								<option value="">Seleccione una opción</option>
								{this.state.data_tipo_sensor}
							</FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Precio base</ControlLabel>
							<FormControl type="text" className="only-number-float" maxLength="10" id="formPrecioBase" name="precio_base" onChange={this.handleChange} value={this.state.precio_base} placeholder="Ingrese el precio base" />
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer className={this.state.btn_class}>
					<Button bsStyle="success" onClick={this.handleSendClick}>Enviar datos</Button>
				</Modal.Footer>
			</div>
		)
	}
}