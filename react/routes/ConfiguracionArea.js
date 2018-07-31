import FormArea from '../components/elements/FormArea.js'
import ModalForm from '../components/ModalForm.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'

export default class ConfiguracionArea extends React.Component {
	state = {
		lista_areas: [
			<div key="0" className="col-md-12 text-center">
				<div className="blank-page">
					<h3 className="font-normal">Cargando áreas...</h3>
				</div>
			</div>
		],
		showModal: false
	}
	componentDidMount(){
		this.loadArea()
	}
	saveArea = (content_data) => {
		let _this = this
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: server_url+"area/guardar",
			dataType: "json",
			data: '{"nombre_area":"' + content_data['nombre_area']+ '"}',
			success: function(response){
				_this.setState({
					showModal: false
				})
				_this.loadArea()
				alert(response['response'])
			}
		})
		return false
	}
	loadArea(){
		let content = []
		let _this = this
		$.get(server_url+"area/false", function(response){
			$.each(response, function(index, value){
				$.each(value, function(_index, _value){
					content.push(
						<Link to={"/area/"+_value.slug_area} className="col-md-4" key={_index} id="store-link">
							<div className="blank-page" style={{ height: 90, marginBottom: 5 }}>
								<div className="row">
									<div className="col-md-7">
										<h3 className="font-normal">Área { _value.nombre_area }</h3>
									</div>
									<div className="col-md-5 text-center">
										<h5>{_value.total_sensores}</h5>
										<h5>Total sensores</h5>
									</div>
								</div>
							</div>
						</Link>
					)
				})
			})
			_this.setState({
				lista_areas: content
			});
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
							<div className="col-md-12" key={0} onClick={() => this.setState({showModal: true})}>
								<div className="blank-page text-center btn-complete">
									<h3 className="font-normal">Registrar área</h3>
								</div>
							</div>
							<div className="row">
								{ this.state.lista_areas }
							</div>
						</div>
					</div>
					{
						this.state.showModal &&
						<ModalForm handleShow={this.state.showModal} title="Crear área" handleClose={modalClose}>
							<FormArea saveEvent={this.saveArea} />
						</ModalForm>
					}
					<Footer />
				</div>
			</div>
		)
	}
}