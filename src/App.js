import {
  Container,
  CssBaseline,
  LinearProgress,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@material-ui/core";

import { FirebaseAppProvider } from "reactfire";
import Routes from "./Routes";
import { Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo } from "react";

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
  container: {
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
}));

function Main() {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.container} maxWidth="sm">
      <Suspense fallback={<LinearProgress />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
          <Routes />
        </FirebaseAppProvider>
      </Suspense>
    </Container>
  );
}

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}
