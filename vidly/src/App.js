import "./App.css";
// import Movies from "./components/Movies";
// import Counters from "./components/Movies";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";
import Register from "./components/Register";
import React, { Component } from "react";
import LoginForm from "./components/LoginForm";

export class App extends Component {
  render() {
    return (
      <div>
        <div>
          <main className="container">
            {/* <Movies /> */}
            {/* <Counters /> */}
            <NavBar />
            <div className="content">
              <Switch>
                <Route path="/movies/:id" component={MovieForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/movies" component={Movies}></Route>
                <Route path="/customers" component={Customers}></Route>
                <Route path="/rentals" component={Rentals}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/not-found" component={NotFound}></Route>
                <Redirect from="/" exact to="/movies" />
                <Redirect to="/not-found" />
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
