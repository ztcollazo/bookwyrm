import React from 'react';
import './style/App.css';
import Nav from "./components/Nav";
import { AppContext } from './setup';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.dark = {
      primary: "#333333",
      text: "white",
      other: "black"
    };

    this.light = {
      primary: "white",
      text: "black",
      other: "darkgrey"
    };

    this.state = {
      searchInput: ""
    };

    this.style = {
      backgroundColor: this.dark.primary,
      color: this.dark.text
    }
  }

  setSearchInput = (input) => {
    this.setState({
      searchInput: input
    });
  }

  render() {
    return (
      <AppContext.Provider value={{ searchInput: this.state.searchInput, setSearchInput: this.setSearchInput }}>
        <Nav />
        <main id="main" style={ this.style } >
          <div id="content">
            {this.props.children}
          </div>
        </main>
      </AppContext.Provider>
    );
  }
}

export default App;
