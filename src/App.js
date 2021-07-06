import "./App.css";
import "firebase/auth";

import { AuthCheck, FirebaseAppProvider, useUser } from "reactfire";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Sachie from "./Sachie";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase/app";
import logo from "./logo.svg";
import Login from "./Login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEyWo6zmJitfkd_voFMTyxDQjLXyFIzmk",
  authDomain: "livre-journal.firebaseapp.com",
  projectId: "livre-journal",
  storageBucket: "livre-journal.appspot.com",
  messagingSenderId: "62247619992",
  appId: "1:62247619992:web:bf220a6abf9173ff8eafed",
  measurementId: "G-SNXLPFL2Z5",
};

function AvatarHeader() {
  const { data: user } = useUser();
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </ListItemAvatar>
        <ListItemText primary={"Hi " + user.displayName} secondary={date} />
      </ListItem>
    </List>
  );
}

function Main2() {
  return (
    <>
      <AvatarHeader />
      <Link to="/">Main</Link>
    </>
  );
}

function Main() {
  return (
    <>
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
    </>
  );
}

function Routing() {
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

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <div className="App">
        <header className="App-header">
          <AuthCheck fallback={<Login />}>
            <Routing />
          </AuthCheck>
        </header>
      </div>
    </FirebaseAppProvider>
  );
}

export default App;
