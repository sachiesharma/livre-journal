import { Button } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Sachie from "./Sachie";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase/app";
import logo from "./logo.svg";
import AvatarHeader from "./AvatarHeader";

import { Link } from "react-router-dom";

export default function Main() {
  return (
    <header className="App-header">
      <Button
        variant="contained"
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign Out
      </Button>
      <AvatarHeader />
      <Sachie />
      <Paper>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Paper>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Welcome to Livre Journal! :)</p>
      <Link to="/main2">Main 2</Link>
    </header>
  );
}
