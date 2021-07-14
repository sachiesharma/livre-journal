import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import Main2 from "./Main2";

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/main2">
          <Main2 />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
