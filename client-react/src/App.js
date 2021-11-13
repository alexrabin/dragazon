import React from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path="/" exact element={ <HomePage/>}/>
        <Route path="/login" exact element={ <LoginPage/>}/>

      </Routes>
    </div>
  );
}

export default App;
