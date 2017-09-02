import React from 'react'

export default class ReceiveDataSensor extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		console.log(this.props.match)
	}
	render(){
		return (
			<footer className="footer text-center">
				&copy; Desarrollado por Adriann Sanchez
			</footer>
		)
	}
}