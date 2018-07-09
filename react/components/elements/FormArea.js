import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import React from 'react'

export default class FormArea extends React.Component {
	constructor(){
		super()
		this.state = {
			nombre_area: '',
			slug_area: '',
			btn_class: 'hide'
		}
		this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount(){
		let _this_ = this
		if('args' in _this_.props){
			this.setState({
				nombre_area: _this_.props.args.nombre_area,
				slug_area: _this_.props.args.slug_area,
				btn_class: ''
			})
		}
	}
	handleChange(e) {
		this.setState({
			nombre_area: e.target.value,
			btn_class: (e.target.value != '' ? '': 'hide')
		})
	}
	getValidationState(){
		return this.state.nombre_area != '' ? 'success': 'error'
	}
	render(){
		return (
			<div>
				<Modal.Body>
					<form>
						<FormGroup validationState={this.getValidationState()}>
							<ControlLabel>Nombre del área</ControlLabel>
							<FormControl type="text" value={this.state.nombre_area} placeholder="Enter text" onChange={this.handleChange} /><FormControl.Feedback />
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer className={this.state.btn_class}>
					<Button bsStyle="success" onClick={this.props.saveEvent.bind(this, {nombre_area: this.state.nombre_area, slug_area: this.state.slug_area})}>Enviar datos</Button>
				</Modal.Footer>
			</div>
		)
	}
}