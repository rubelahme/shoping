import "./App.scss";
import Home from "../src/Components/Home/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoMatch from "./Components/NoMatch/NoMatch";
import Review from "./Components/Review/Review";
import Manage from "./Components/Manage/Manage";
import DetailsPage from "./Components/DetailsPage/DetailsPage";
import Shipment from "./Components/Shipment/Shipment";
import Login from "./Components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./Components/Login/PrivateRoute";
export const AllProvider = createContext();

function App() {
  const [loginItem, setLoginItem] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  return (
    <AllProvider.Provider value={[loginItem, setLoginItem]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Home></Home>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/manage">
            <Manage></Manage>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/ProductDetails/:key">
            <DetailsPage></DetailsPage>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </AllProvider.Provider>
  );
}

export default App;
