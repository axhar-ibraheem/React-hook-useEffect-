import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import React, { useContext } from "react";
import AuthContext from "./store/authContext";

function App() {
  const context = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!context.isLoggedIn && <Login />}
        {context.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
