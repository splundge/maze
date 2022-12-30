import React from 'react';
import Landing from '../../Views/Landing/Landing';
import View from '../View/View';
import './App.scss';

const App = () => {
	return (
		<div className="app">
			<View>
				<Landing />
			</View>
		</div>
	);
};

export default App;
