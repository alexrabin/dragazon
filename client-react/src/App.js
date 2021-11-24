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



function App() {

  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState({});

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


  const fetchProfile = useCallback(async () => {
    let user = await authService.getLoggedInUser();
    if (user.response) {
      setProfile(user.response.data);
      fetchCart();
    } else if (user.error) {
      setProfile(null);
    }
  }, [fetchCart]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const appSettings = {
    profile: profile,
    cart: cart,
    setCart,
    logOut,
    fetchProfile,
    fetchCart
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

        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
