import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import React from 'react'

export default class FormArea extends React.Component {
	state = {
		nombre_area: '',
		slug_area: '',
		btn_class: 'hide'
	}
	handleChange = (event) => {
		this.setState({
			nombre_area: event.target.value,
			btn_class: (event.target.value != '' ? '': 'hide')
		})
	}
	handleSendClick = () => {
		return this.props.saveEvent({nombre_area: this.state.nombre_area, slug_area: this.state.slug_area})
	}
	render(){
		return (
			<div>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nombre del área</ControlLabel>
							<FormControl type="text" value={this.state.nombre_area} placeholder="Enter text" onChange={this.handleChange} /><FormControl.Feedback />
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