import React, {useState, useEffect, useCallback} from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import {Routes, Route} from 'react-router-dom' ;
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboardPage from "./pages/AdminDashboard";
import ProductPage from "./pages/ProductPage";
import AppContext from './components/AppContext';
import authService from "./services/auth";
import mainService from "./services/main";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";



function App() {

  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);

  const logOut = async () => {
    await authService.logout();
    setCart({});
    fetchProfile();
  }



  const fetchCart = useCallback(async () => {
    let cartObject = await mainService.getCart();
    if (cartObject.response) {
      setCart(cartObject.response.data);
    } else if (cartObject.error) {
      setCart({});
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    let orderObject = await mainService.getOrders();
    if (orderObject.response) {
      setOrders(orderObject.response.data);
    } else if (orderObject.error) {
      setOrders({});
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    let user = await authService.getLoggedInUser();
    if (user.response) {
      setProfile(user.response.data);
      fetchCart();
      fetchOrders();
    } else if (user.error) {
      setProfile(null);
    }
  }, [fetchCart, fetchOrders]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const appSettings = {
    profile: profile,
    cart: cart,
    orders: orders,
    setCart,
    setOrders,
    logOut,
    fetchProfile,
    fetchCart,
    fetchOrders
  };
  
  return (
    <div className="App">
      <AppContext.Provider value={appSettings}>
        <NavigationBar/>
        <Routes>
          <Route path="/" exact element={ <HomePage/>}/>
          <Route path="/login" exact element={ <LoginPage/>}/>
          <Route path="/profile" exact element={ <ProfilePage/>}/>
          <Route path="/admindashboard" exact element={ <AdminDashboardPage/>}/>
          <Route path="/product" exact element={ <ProductPage/>}/>
          <Route path="/checkout" exact element={ <CheckoutPage/>}/>
          <Route path="/orders" exact element={ <OrdersPage/>}/>

        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
