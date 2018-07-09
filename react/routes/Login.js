import { PostData } from '../services/PostData.js'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Login extends React.Component {
	constructor(){
		super()
		this.state = {
			username: '',
			password: ''
		}
		this.authenticateAction = this.authenticateAction.bind(this)
		this.onChange = this.onChange.bind(this)
	}
	authenticateAction(){
		PostData('login', this.state).then((response) => {
			console.log(response)
		})
		return false
	}
	onChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render(){
		return (
			<div className="login">
				<h1>HotelControl</h1>
				<div className="login-bottom">
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
							<input type="submit" value="Ingresar" onClick={this.authenticateAction.bind(this)} />
						</label>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
		)
	}
}