import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import FormConsumoTolerable from '../components/elements/FormConsumoTolerable.js'
import FormCostoConsumo from '../components/elements/FormCostoConsumo.js'
import FormSensor from '../components/elements/FormSensor.js'
import FormArea from '../components/elements/FormArea.js'
import React from 'react'

export default class ModalForm extends React.Component {
	constructor(){
		super()
	}
	choseContent(typeModal, saveEvent){
		switch(typeModal) {
			case 'area_form':
				return <FormArea saveEvent={saveEvent} />
			case 'area_edit_form':
				return <FormArea saveEvent={saveEvent} args={this.props.args} />
			case 'sensor_form':
				return <FormSensor saveEvent={saveEvent} args={this.props.args} />
			case 'consumo_tolerable_form':
				return <FormConsumoTolerable saveEvent={saveEvent} args={this.props.args} />
			case 'costo_consumo_form':
				return <FormCostoConsumo saveEvent={saveEvent} args={this.props.args} />
		}
	}
	render(){
		return (
			<Modal show={this.props.handleShow} onHide={this.props.handleClose} aria-labelledby="contained-modal-title">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
				</Modal.Header>
				{this.choseContent(this.props.typeModal, this.props.saveEvent, this.props.codeId)}
			</Modal>
		)
	}
}