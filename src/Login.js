import { Button, Container } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
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

  const signIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
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
