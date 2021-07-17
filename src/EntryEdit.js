import {
  Box,
  Fab,
  Grid,
  LinearProgress,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";

import DoneIcon from "@material-ui/icons/Done";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
  },
}));

export default function EntryEdit() {
  const classes = useStyles();
  const { entryId } = useParams();
  const { data: user } = useUser();
  const entryRef = useFirestore()
    .collection("users")
    .doc(user.uid)
    .collection("entries")
    .doc(entryId);
  const { status, data: entry } = useFirestoreDocData(entryRef, {
    idField: "id",
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(entry?.content || "");
  }, [entry]);

  const updateContent = (event) => {
    setContent(event.target.value);
    updateFirestoreContent(event.target.value);
  };

  const updateFirestoreContent = useDebouncedCallback((content) => {
    const payload = { content };
    if (!entry?.date) {
      payload.date = new Date();
    }
    entryRef.set(payload, { merge: true });
  }, 1000);

  // easily check the loading status
  if (status === "loading") {
    return <LinearProgress />;
  }

  return (
    <Box p={2}>
      <TextField
        multiline
        className={classes.textField}
        placeholder="Book title"
        value={content}
        onChange={updateContent}
      />
      <Grid container justifyContent="flex-end">
        <Fab
          color="primary"
          className={classes.fab}
          aria-label="done"
          component={Link}
          to="/"
        >
          <DoneIcon />
        </Fab>
      </Grid>
    </Box>
  );
}
