import DoneIcon from "@mui/icons-material/Done";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import {
  Box,
  Fab,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFirestoreDocData } from "reactfire";
import { useEntries } from "./hooks";

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
  const allEntries = useEntries();

  const entryRef = doc(allEntries, entryId);

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

  const handleStartDateChange = (date) => {
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
    setDoc(entryRef, payload, { merge: true });
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
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MobileDatePicker
          label="Start date"
          inputFormat="MM/dd/yyyy"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
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
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        value={rating}
        onChange={(event, newRating) => {
          setRating(newRating);
        }}
      />
    </>
  );
}
