import { Button, Container, makeStyles } from "@material-ui/core";

import { FcGoogle } from "react-icons/fc";
import firebase from "firebase/app";
import { useAuth } from "reactfire";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    textTransform: "none",
  },
}));

export default function Login() {
  const auth = useAuth();
  const classes = useStyles();

  const signIn = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container className={classes.container}>
      <Button
        className={classes.button}
        variant="contained"
        startIcon={<FcGoogle />}
        onClick={signIn}
      >
        Sign in with Google
      </Button>
    </Container>
  );
}
