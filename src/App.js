import "./App.css";
import "firebase/auth";

import { AuthCheck, FirebaseAppProvider } from "reactfire";

import Login from "./Login";
import Routing from "./Routing";

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

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <div className="App">
        <AuthCheck fallback={<Login />}>
          <Routing />
        </AuthCheck>
      </div>
    </FirebaseAppProvider>
  );
}

export default App;
