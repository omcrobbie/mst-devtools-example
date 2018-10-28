import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";
import RoomStore from './store/models/RoomStore';
import { connectReduxDevtools, asReduxStore } from 'mst-middlewares'
import { Provider } from 'react-redux';
import "./styles.css";

const roomStore = RoomStore.create();
const store = asReduxStore(roomStore);
connectReduxDevtools(require('remotedev'), roomStore, {
    logArgsNearName: false,
    logIdempotentActionSteps: false
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
      <Main />
  </Provider>, 
  rootElement);
