import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './routes/Home.js'
import Store from './components/Store.js'
import ReceiveDataSensor from './components/ReceiveDataSensor.js'

ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={Home} />
			<Route path='/store' component={Store} />
			<Route path='/receive/:sensor_id/:value' component={ReceiveDataSensor} />
		</div>
	</Router>
, document.getElementById('app'))
