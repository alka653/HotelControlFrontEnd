import { postData, setIdToken } from '../services/PostData.js'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Login extends React.Component {
	state = {
		username: '',
		password: '',
		message: '',
		redirect: false
	}
	authenticateAction = () => {
		this.setState({
			message: [
				<div className="alert alert-info" role="alert" key="0">
					Cargando ...
				</div>
			]
		})
		postData('login', this.state).then((response) => {
			this.setState({
				message: [
					<div className={`alert alert-${response.response}`} role="alert" key="0">
						{response.msg}
					</div>
				]
			})
			if(response.logged){
				setIdToken(response.data)
				this.setState({
					redirect: true
				})
			}
		})
	}
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render(){
		return !this.state.redirect ? (
			<div className="login">
				<h1>HotelControl</h1>
				<div className="login-bottom">
					{this.state.message}
					<div className="login-mail">
						<input type="text" name="username" placeholder="Usuario" required="" onChange={this.onChange} />
						<i className="fa fa-user"></i>
					</div>
					<div className="login-mail">
						<input type="password" name="password" placeholder="Contraseña" required="" onChange={this.onChange} />
						<i className="fa fa-lock"></i>
					</div>
					<div className="login-do">
						<label className="hvr-shutter-in-horizontal login-sub">
							<input type="submit" value="Ingresar" onClick={this.authenticateAction} />
						</label>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
		): <Redirect to='/' />
	}
}