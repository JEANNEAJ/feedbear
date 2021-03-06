import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initializeStore } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

(async function initializeStoreAndRenderApp() {
  
  try {
    const store = await initializeStore();
    
    return ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    )
  } catch (error) {
    console.log(error);
  }

})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
