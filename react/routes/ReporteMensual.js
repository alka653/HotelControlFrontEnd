import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Link } from 'react-router-dom'
import React from 'react'

export default class ReporteMensual extends React.Component {
	handleSendReport = () => {

	}
	render(){
		return (
			<div id="wrapper">
				<Header />
				<div id="page-wrapper" className="gray-bg dashbard-1">
					<div className="content-main">
						<div className="blank">
							<div className="blank-page">
								<h3 className="font-normal">Reporte de consumo mensual</h3>
								<hr/>
								<form>
									<div className="row">
										<div className="col-md-6">
											<FormGroup>
												<ControlLabel>Fecha inicio</ControlLabel>
												<FormControl type="date" placeholder="2018/08/11" /><FormControl.Feedback />
											</FormGroup>
										</div>
										<div className="col-md-6">
											<FormGroup>
												<ControlLabel>Fecha final</ControlLabel>
												<FormControl type="date" placeholder="2018/09/11" /><FormControl.Feedback />
											</FormGroup>
										</div>
									</div>
									<div className="text-center">
										<Button bsStyle="success" onClick={this.handleSendReport}>Consultar datos</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		)
	}
}