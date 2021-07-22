import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Introduction from 'pages/Inicio/Introduction';
import TopicIntroduction from 'pages/TopicIntroduction';
import TopicLesson from 'pages/TopicLesson';
import Visualization from 'pages/Visualization';
import TopicTest from "pages/TopicTest";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/intro' component={Introduction} />
        <Route exact path='/:category/:topic' component={TopicIntroduction} />
        <Route exact path='/:category/:topic/leccion' component={TopicLesson} />
        <Route
          exact
          path='/:category/:topic/visualizacion'
          component={Visualization}
        />
        <Route exact path="/:category/:topic/ejercicios" component={TopicTest} />
      </Switch>
    </Router>
  );
}

export default App;