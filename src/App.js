import logo from "./logo.svg";
import "./App.css";
import Sachie from "./Sachie";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { FirestoreProvider } from "@react-firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDEyWo6zmJitfkd_voFMTyxDQjLXyFIzmk",
  projectId: "livre-journal",
  authDomain: "livre-journal.firebaseapp.com",
};

function App() {
  return (
    <FirestoreProvider {...firebaseConfig} firebase={firebase}>
      <div className="App">
        <header className="App-header">
          <Sachie />
          <Paper>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Paper>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to Livre Journal! :)</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </FirestoreProvider>
  );
}

export default App;
