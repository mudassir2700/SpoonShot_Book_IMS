import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavBar from './components/navbar';
import MainPage from './components/MainPage';
import AddBook from './components/AddBook';
import SearchBook from './components/Search';
function App() {
  return (
    <div className="App">
      <Router>
			<Switch>
				<Route exact path="/" component={MainPage} />
        <Route exact path="/addbook" render={(props)=><AddBook {...props} />} />
        <Route exact path="/searchbook" render={(props)=><SearchBook {...props} />} />
			</Switch>
	</Router>

    </div>
  );
}

export default App;
