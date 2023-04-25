import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import DogDetail from './components/Details/Details';
import Form from './components/Form/Form'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/home">
            <Home />
          </Route>

          <Route exact path="/dog-detail/:id">
            <DogDetail />
          </Route>

          <Route exact path="/dog">
            <Form />
          </Route>

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
