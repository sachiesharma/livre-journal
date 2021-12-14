import "date-fns";
import {
  Box,
  Fab,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { useHistory, useParams } from "react-router-dom";

import DoneIcon from "@material-ui/icons/Done";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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
  const [startDate, setStartDate] = useState(null);
  const [characterRating, setCharacterRating] = useState(0);
  const [writingRating, setWritingRating] = useState(0);
  const [plotDevelopmentRating, setPlotDevelopmentRating] = useState(0);
  const [originalityRating, setOriginalityRating] = useState(0);
  const [engagementRating, setEngagementRating] = useState(0);
  const [insightfulnessRating, setInsightfulnessRating] = useState(0);
  const [comprehensivenessRating, setComprehensivenessRating] = useState(0);
  const [impactfulnessRating, setImpactfulnessRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [read, setRead] = useState(false);

  useEffect(() => {
    setContent(entry?.content || "");
    setStartDate(entry?.startDate?.toDate() || new Date());
    setCharacterRating(entry?.characterRating || 0);
    setWritingRating(entry?.writingRating || 0);
    setPlotDevelopmentRating(entry?.plotDevelopmentRating || 0);
    setOriginalityRating(entry?.originalityRating || 0);
    setEngagementRating(entry?.engagementRating || 0);
    setInsightfulnessRating(entry?.insightfulnessRating || 0);
    setComprehensivenessRating(entry?.comprehensivenessRating || 0);
    setImpactfulnessRating(entry?.impactfulnessRating || 0);
    setOverallRating(entry?.overallRating || 0);
    setRead(entry?.read || false);
  }, [entry]);

  console.log(entry);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

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
      read,
      startDate,
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
      <FormControlLabel
        control={
          <Switch
            checked={read}
            onChange={(event) => setRead(event.target.checked)}
            color="primary"
          />
        }
        label="Read"
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date Started"
          value={startDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <LivreRating
        label="Characters"
        rating={characterRating}
        setRating={setCharacterRating}
      />
      <LivreRating
        label="Writing"
        rating={writingRating}
        setRating={setWritingRating}
      />
      <LivreRating
        label="Plot Development"
        rating={plotDevelopmentRating}
        setRating={setPlotDevelopmentRating}
      />
      <LivreRating
        label="Originality"
        rating={originalityRating}
        setRating={setOriginalityRating}
      />
      <LivreRating
        label="Engagement"
        rating={engagementRating}
        setRating={setEngagementRating}
      />
      <LivreRating
        label="Insightfulnes"
        rating={insightfulnessRating}
        setRating={setInsightfulnessRating}
      />
      <LivreRating
        label="Comprehensiveness"
        rating={comprehensivenessRating}
        setRating={setComprehensivenessRating}
      />
      <LivreRating
        label="Impactfulness"
        rating={impactfulnessRating}
        setRating={setImpactfulnessRating}
      />
      <LivreRating
        label="Overall Rating"
        rating={overallRating}
        setRating={setOverallRating}
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

function LivreRating({ label, rating, setRating }) {
  return (
    <>
      <Typography component="legend">{label}</Typography>
      <StyledRating
        name={`${label}-rating`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        value={rating}
        onChange={(event, newRating) => {
          setRating(newRating);
        }}
      />
    </>
  );
}
