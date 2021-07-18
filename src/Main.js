import "firebase/firestore";

import { Box, Container, Fab, Grid } from "@material-ui/core";
import { useFirestore, useUser } from "reactfire";

import AddIcon from "@material-ui/icons/Add";
import AvatarHeader from "./AvatarHeader";
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

  const { data: user } = useUser();

  const entryId = useFirestore()
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
