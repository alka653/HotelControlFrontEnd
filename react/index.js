import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './routes/Home.js'
import Store from './components/Store.js'

ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={Home} />
			<Route path='/store' component={Store} />
		</div>
	</Router>
, document.getElementById('app'))
