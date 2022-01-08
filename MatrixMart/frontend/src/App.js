import './App.css';
import Header from './component/layout/Header/Header.js'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState } from 'react';
import Footer from './component/layout/Footer/footer.js'
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
// import NotFound from "./component/layout/NotFound/NotFound.js";
function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
    console.log(data.stripeapikey);

  }

  // Will be made functional before deployment
  // window.addEventListener("contextmenu", (e) => e.preventDefault());


  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();

  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}



      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route exact path="/products/" element={<Products />} />
        <Route path="/product/:keyword" element={<Products />} />
        <Route exact path="/Search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        {/* ProtectedRoute will be implemented soon */}
        {/* <Route exact path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
        {isAuthenticated && <Route exact path="/account" element={<Profile />} />}
        {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile />} />}
        {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword />} />}
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/cart" element={<Cart />} />

        {isAuthenticated && <Route exact path="/shipping" element={<Shipping />} />}

        {isAuthenticated && <Route exact path="/success" element={<OrderSuccess />} />}

        {isAuthenticated && <Route exact path="/orders" element={<MyOrders />} />}

        {isAuthenticated && <Route exact path="/orders/confirm" element={<ConfirmOrder />} />}

        {stripeApiKey && isAuthenticated && (
          <Route exact path="/process/payment" element={<Payment />} />
        )}

        {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails />} />}

        {isAuthenticated && <Route exact path="/admin/dashboard" element={<Dashboard user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/products" element={<ProductList user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/product" element={<NewProduct user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/product/:id" element={<UpdateProduct user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/orders" element={<OrderList user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/order/:id" element={<ProcessOrder user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/users" element={<UsersList user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/user/:id" element={<UpdateUser user={user} />} />}

        {isAuthenticated && <Route exact path="/admin/reviews" element={<ProductReviews user={user} />} />}

        {/* will make the page not found functional */}
        {/* <Route element={window.location.pathname === "/process/payment" ? null : <NotFound/>} /> */}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
