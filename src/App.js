import "./App.scss";
import Home from "../src/Components/Home/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoMatch from "./Components/NoMatch/NoMatch";
import Review from "./Components/Review/Review";
import Manage from "./Components/Manage/Manage";
import DetailsPage from "./Components/DetailsPage/DetailsPage";

function App() {
  return (
    <div>
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
          <Route path="/ProductDetails/:key">
            <DetailsPage></DetailsPage>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
