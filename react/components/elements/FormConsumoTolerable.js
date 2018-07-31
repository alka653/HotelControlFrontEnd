import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import React from 'react'

export default class FormConsumoTolerable extends React.Component {
	state = {
		tipo_sensor: '',
		slug_area: '',
		data_tipo_sensor: '',
		btn_class: 'hide'
	}
	componentDidMount(){
		let _this_ = this
		$.get(server_url+"type-sensor", function(response){
			let data = []
			$.each(response.object, function(index, value){
				data.push(
					<option key={index} value={value.slug_tipo}>{value.nombre_tipo}</option>
				)
			})
			_this_.setState({
				data_tipo_sensor: data,
				slug_area: _this_.props.args.slug_area
			})
			console.log(_this_.props.args.slug_area)
		})
	}
	handleChange(e){
		let data = []
		if(e.target.validity.valid){
			data[e.target.name] = e.target.value
			this.setState(data)
		}
		if(e.target.name == 'tipo_sensor'){
			if(this.state.data_tipo_sensor != '' && e.target.value != ''){
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
							<ControlLabel>Medida tolerable</ControlLabel>
							<FormControl type="text" pattern="[0-9]*" maxLength="10" id="formIdentificacionSensor" name="identificacion_sensor" onChange={this.handleChange} value={this.state.identificacion_sensor} placeholder="Ingrese la identificación del sensor" />
						</FormGroup>
						<FormGroup>
							<ControlLabel>Tipo de sensor</ControlLabel>
							<FormControl componentClass="select" name="tipo_sensor" placeholder="Seleccione una opción" onChange={this.handleChange}>
								<option value="">Seleccione una opción</option>
								{this.state.data_tipo_sensor}
							</FormControl>
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer className={this.state.btn_class}>
					<Button bsStyle="success" onClick={this.props.saveEvent(this, {'identificacion_sensor': this.state.identificacion_sensor, 'slug_area': this.state.slug_area, 'tipo_sensor': this.state.tipo_sensor})}>Enviar datos</Button>
				</Modal.Footer>
			</div>
		)
	}
}