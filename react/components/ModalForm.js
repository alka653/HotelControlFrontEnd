import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import FormConsumoTolerable from '../components/elements/FormConsumoTolerable.js'
import FormCostoConsumo from '../components/elements/FormCostoConsumo.js'
import FormSensor from '../components/elements/FormSensor.js'
import FormArea from '../components/elements/FormArea.js'
import { createPortal } from 'react-dom'
import React from 'react'

function choseContent(typeModal, saveEvent, args){
	switch(typeModal) {
		case 'area_form':
			return <FormArea saveEvent={saveEvent} />
		case 'area_edit_form':
			return <FormArea saveEvent={saveEvent} args={args} />
		case 'sensor_form':
			return <FormSensor saveEvent={saveEvent} args={args} />
		case 'consumo_tolerable_form':
			return <FormConsumoTolerable saveEvent={saveEvent} args={args} />
		case 'costo_consumo_form':
			return <FormCostoConsumo saveEvent={saveEvent} args={args} />
		case 'update_costo_consumo_form':
			return <FormCostoConsumo saveEvent={saveEvent} args={args} />
	}
}

const ModalForm = (props) => (
	<Modal show={props.handleShow} onHide={props.handleClose} aria-labelledby="contained-modal-title">
		<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-lg">{props.title}</Modal.Title>
		</Modal.Header>
		{ props.children }
	</Modal>
)

export default ModalForm