
//import React, { Component } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import * as actions from "./actions";
import Header from "./components/Header";
import Landing from "./components/Landing";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
// import { connect } from "react-redux";
import { getUser } from "./reducers/authReducer";


const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


const App = () =>{
  const dispatch = useDispatch();
  //const {user} = useSelector((state) => state.authUser);
  useEffect(() => {
    dispatch(getUser());
  });
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/surveys" element={<Dashboard/>} />
          <Route path="/surveys/new" element ={<SurveyNew/>} />
        </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
