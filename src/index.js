import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HomeContent from "./components/HomeContent";
import AddBook from "./components/books/AddBook"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoResults from "./components/NoResults";
import Results from "./components/Results";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Route exact strict path="/">
            <HomeContent />
          </Route>
          <Route path="/add-book">
            <AddBook />
          </Route>
          <Route path="/top-books">

          </Route>
          <Route path="/forum">

          </Route>
          <Route path="/review">

          </Route>
          <Route path="/browse">

          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route>
            <NoResults />
          </Route>
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
