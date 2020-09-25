import React from 'react';
import './style/App.css';
import Nav from "./components/Nav";

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
      theme: this.dark
    };

    //this.changeTheme = this.changeTheme.bind(this);

    this.style = {
      backgroundColor: this.state.theme.primary,
      color: this.state.theme.text
    }
  }

  /*changeTheme(newTheme) {
    this.setState({ theme: newTheme })
  }*/

  render() {
    return (
      <>
        <Nav />
        <main id="main" style={ this.style } >
          <div id="content">
            {this.props.children}
          </div>
        </main>
      </>
    );
  }
}

export default App;
