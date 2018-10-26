import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import RoomStore from './models/RoomMST'
import { connectReduxDevtools, asReduxStore } from 'mst-middlewares'
import { Provider } from 'react-redux';
import "./styles.css";

const roomStore = (window.roomStore = RoomStore.create());
const store = asReduxStore(roomStore);
console.log(store)
connectReduxDevtools(require('remotedev'), roomStore);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
      <Main />
  </Provider>, 
  rootElement);
