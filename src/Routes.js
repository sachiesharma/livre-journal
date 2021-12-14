import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { LinearProgress } from "@mui/material";
import Login from "./Login";
import Main from "./Main";
import ReviewEdit from "./ReviewEdit";
import { useSigninCheck } from "reactfire";

export default function Routes() {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <LinearProgress />;
  }

  if (!signInCheckResult.signedIn) {
    return <Login />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/editor/:entryId">
          <ReviewEdit />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
