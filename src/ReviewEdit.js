import { Box, Fab, Grid, TextField, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { useHistory, useParams } from "react-router-dom";

import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
  },
}));

export default function ReviewEdit() {
  const classes = useStyles();
  const history = useHistory();
  const { entryId } = useParams();
  const { data: user } = useUser();

  const entryRef = useFirestore()
    .collection("users")
    .doc(user.uid)
    .collection("entries")
    .doc(entryId);

  const { data: entry } = useFirestoreDocData(entryRef, {
    idField: "id",
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(entry?.content || "");
  }, [entry]);

  const updateContent = (event) => {
    setContent(event.target.value);
  };

  const updateFirestoreContent = () => {
    const payload = { content };
    if (!entry?.date) {
      payload.date = new Date();
    }
    entryRef.set(payload, { merge: true });
    history.push("/");
  };

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
          onClick={updateFirestoreContent}
        >
          <DoneIcon />
        </Fab>
      </Grid>
    </Box>
  );
}
