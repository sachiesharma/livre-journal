import { Box, Fab, Grid, TextField, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { useHistory, useParams } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#dda0dd",
  },
  iconHover: {
    color: "#e576e5",
  },
})(Rating);

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
  const [characterRating, setCharacterRating] = useState("");
  const [writingRating, setWritingRating] = useState("");

  useEffect(() => {
    setContent(entry?.content || "");
    setCharacterRating(entry?.characterRating);
    setWritingRating(entry?.writingRating);
  }, [entry]);

  const updateContent = (event) => {
    setContent(event.target.value);
  };

  const updateFirestoreContent = () => {
    const payload = { content, characterRating, writingRating };
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
      <Typography component="legend">Characters</Typography>
      <StyledRating
        name="character-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={characterRating}
        onChange={(event, newRating) => {
          setCharacterRating(newRating);
        }}
      />
      <Typography component="legend">Writing</Typography>
      <StyledRating
        name="writing-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={writingRating}
        onChange={(event, newRating) => {
          setWritingRating(newRating);
        }}
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
