import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import HeaderTop from './HeaderTop.js'
import HeaderLeft from './HeaderLeft.js'

export default class Header extends React.Component {
	constructor(){
		super()
	}
	render(){
		return (
			<div>
				<HeaderTop />
				<HeaderLeft />
			</div>
		)
	}
}