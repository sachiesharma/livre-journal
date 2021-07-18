import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuth, useSigninCheck } from "reactfire";

import { LinearProgress } from "@material-ui/core";
import Main from "./Main";
import ReviewEdit from "./ReviewEdit";
import { StyledFirebaseAuth } from "react-firebaseui";

function Login() {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
}

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
