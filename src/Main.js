import "firebase/firestore";

import { Box, Container, Fab, Grid, LinearProgress } from "@material-ui/core";
import { useAuth, useFirestore, useUser } from "reactfire";

import AddIcon from "@material-ui/icons/Add";
import AvatarHeader from "./AvatarHeader";
import { ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Reviews from "./Reviews";
import { makeStyles } from "@material-ui/core/styles";

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
  const firestore = useFirestore();

  if (user === null || status === "loading") {
    return <LinearProgress />;
  }

  const entryId = firestore
    .collection("users")
    .doc(user.uid)
    .collection("entries")
    .doc().id;

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
