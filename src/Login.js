import { Button } from "@material-ui/core";

import firebase from "firebase/app";

export default function Login() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
      }}
    >
      Sign In with Google
    </Button>
  );
}
