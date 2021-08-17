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
  const [plotDevelopmentRating, setPlotDevelopmentRating] = useState("");
  const [originalityRating, setOriginalityRating] = useState("");
  const [engagementRating, setEngagementRating] = useState("");
  const [insightfulnessRating, setInsightfulnessRating] = useState("");
  const [comprehensivenessRating, setComprehensivenessRating] = useState("");
  const [impactfulnessRating, setImpactfulnessRating] = useState("");
  const [overallRating, setOverallRating] = useState("");

  useEffect(() => {
    setContent(entry?.content || "");
    setCharacterRating(entry?.characterRating);
    setWritingRating(entry?.writingRating);
    setPlotDevelopmentRating(entry?.plotDevelopmentRating);
    setOriginalityRating(entry?.originalityRating);
    setEngagementRating(entry?.engagementRating);
    setInsightfulnessRating(entry?.insightfulnessRating);
    setComprehensivenessRating(entry?.comprehensivenessRating);
    setImpactfulnessRating(entry?.impactfulnessRating);
    setOverallRating(entry?.overallRating);
  }, [entry]);

  const updateContent = (event) => {
    setContent(event.target.value);
  };

  const updateFirestoreContent = () => {
    const payload = {
      content,
      characterRating,
      writingRating,
      plotDevelopmentRating,
      originalityRating,
      engagementRating,
      insightfulnessRating,
      comprehensivenessRating,
      impactfulnessRating,
      overallRating,
    };
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
      <Typography component="legend">Plot Development</Typography>
      <StyledRating
        name="plotDevelopment-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={plotDevelopmentRating}
        onChange={(event, newRating) => {
          setPlotDevelopmentRating(newRating);
        }}
      />
      <Typography component="legend">Originality</Typography>
      <StyledRating
        name="originality-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={originalityRating}
        onChange={(event, newRating) => {
          setOriginalityRating(newRating);
        }}
      />
      <Typography component="legend">Engagement</Typography>
      <StyledRating
        name="engagement-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={engagementRating}
        onChange={(event, newRating) => {
          setEngagementRating(newRating);
        }}
      />
      <Typography component="legend">Insightfulnes</Typography>
      <StyledRating
        name="insightfulness-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={insightfulnessRating}
        onChange={(event, newRating) => {
          setInsightfulnessRating(newRating);
        }}
      />
      <Typography component="legend">Comprehensiveness</Typography>
      <StyledRating
        name="comprehensiveness-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={comprehensivenessRating}
        onChange={(event, newRating) => {
          setComprehensivenessRating(newRating);
        }}
      />
      <Typography component="legend">Impactfulness</Typography>
      <StyledRating
        name="impactfulness-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={impactfulnessRating}
        onChange={(event, newRating) => {
          setImpactfulnessRating(newRating);
        }}
      />
      <Typography component="legend">Overall Rating</Typography>
      <StyledRating
        name="overall-rating"
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={overallRating}
        onChange={(event, newRating) => {
          setOverallRating(newRating);
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
