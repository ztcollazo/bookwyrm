import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HomeContent from "./components/HomeContent";
import AddBook from "./components/books/AddBook"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NoResults from "./components/NoResults";
import Results from "./components/Results";
import { BookPage } from './components/books/Book';
import { ReviewPage } from './components/books/Review';
import Browse from "./components/Browse";
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory.js';
import AuthCallback from './components/AuthCallback';
import AddReview from './components/books/AddReview';
import Rating from './components/books/Rating';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <App>
          <Switch>
            <Route exact strict path="/">
              <HomeContent />
            </Route>
            <Route path="/add-book">
              <AddBook />
            </Route>
            <Route path="/top-books">
              <Rating />
            </Route>
            <Route path="/review/:isbn">
                <ReviewPage />
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
              <BookPage />
            </Route>
            <Route path="/auth-callback">
              <AuthCallback />
            </Route>
            <Route path="/review">
              <Redirect to="/browse" />
            </Route>
            <Route path="/write-review/:isbn">
              <AddReview />
            </Route>
            <Route>
              <NoResults />
            </Route>
          </Switch>
        </App>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
