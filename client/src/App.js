import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { theme } from "./themes/theme";
import Routes from "./routes";

function App() {
  return (
    <>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <Routes />
        </HashRouter>
      </MuiThemeProvider>
    </Provider>
    </>
  );
}

export default App;
