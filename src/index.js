import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HomeContent from "./components/HomeContent";
import AddBook from "./components/books/AddBook"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoResults from "./components/NoResults";
import Results from "./components/Results";
import { Book } from './components/books/Book';
import Browse from "./components/Browse";

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
            <Browse />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/dashboard">

          </Route>
          <Route path="/book/:isbn">
            <Book />
          </Route>
          <Route>
            <NoResults />
          </Route>
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
