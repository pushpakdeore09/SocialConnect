import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/authentication/Authentication";
import Login from "./pages/authentication/Login";
import HomePage from "./pages/homepage/HomePage";
import Message from "./pages/Message/Message";
import Register from "./pages/authentication/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./redux/auth/auth.action";

function App() {
  const { auth } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const isAuthenticated = !!auth.user;

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={isAuthenticated ? <HomePage /> : <Authentication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </div>
  );
}


export default App;