import React from "react";
import { Provider } from "react-redux";
import Navigation from "../app/app.navigator";
import configureStore from "../app/app.store";

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
