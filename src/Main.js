import { Box, Container, Fab, Grid, LinearProgress } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { ExitToApp } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth, useFirestore, useUser } from "reactfire";
import AvatarHeader from "./AvatarHeader";
import Reviews from "./Reviews";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    bottom: theme.spacing(2),
  },
}));

export default function Main() {
  const classes = useStyles();
  const { status, data: user } = useUser();
  const auth = useAuth();
  const db = useFirestore();

  if (user === null || status === "loading") {
    return <LinearProgress />;
  }

  const entryId = doc(
    collection(doc(collection(db, "users"), user.uid), "entries")
  ).id;

  return (
    <>
      <AvatarHeader />
      <Reviews />
      <Container disableGutters className={classes.container} maxWidth="sm">
        <Box ml={2} mr={2}>
          <Grid container justifyContent="flex-end">
            <Fab
              color="primary"
              aria-label="add"
              onClick={async () => await auth.signOut()}
            >
              <ExitToApp />
            </Fab>
            <Fab
              color="primary"
              aria-label="add"
              component={Link}
              to={`/editor/${entryId}`}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
