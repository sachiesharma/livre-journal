import MoreIcon from "@mui/icons-material/MoreVert";
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  StyledEngineProvider,
  ThemeProvider,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import Routes from "./Routes";

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

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
}));

function Main() {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.container} maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              //onClick={handleMobileMenuOpen}
              color="inherit"
              size="large"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Routes />
    </Container>
  );
}

function FirebaseComponents() {
  const app = useFirebaseApp();

  const firestore = getFirestore(app);
  const auth = getAuth(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <Main />
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <CssBaseline />
          <FirebaseComponents />
        </FirebaseAppProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
