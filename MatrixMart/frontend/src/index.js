import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

// will try to fetch this key from backend config.env folder
// let data= axios.get("/api/v1/stripeapikey");
// console.log("the value of data is "+data.stripeApiKey)


ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <Elements stripe={loadStripe("pk_test_51K94CXSCdLT8iMKvZbHpe9q2lR8pDy8DztFsELtOt7rVt9cowXdVfLip2elHsYAiCex8gz1R3woabE6Cd26j3QHX00Z3T2ZBUE")}>
        <App />
      </Elements>
    </AlertProvider>
  </Provider >,
  document.getElementById('root')
);
