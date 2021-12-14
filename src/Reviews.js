import { LinearProgress, List, ListSubheader } from "@mui/material";
import { limit, orderBy, query } from "firebase/firestore";
import { useFirestoreCollectionData } from "reactfire";
import { useEntries } from "./hooks.js";
import Review from "./Review.js";

export default function Reviews() {
  const allEntries = useEntries();

  const entriesRef = query(allEntries, orderBy("date", "desc"), limit(10));

  const { status, data: entries } = useFirestoreCollectionData(entriesRef, {
    idField: "id",
  });

  // easily check the loading status
  if (status === "loading") {
    return <LinearProgress />;
  }

  return (
    <List>
      <ListSubheader>Want to read</ListSubheader>
      {entries
        .filter((entry) => !entry.read)
        .map((entry) => (
          <Review
            key={entry.id}
            id={entry.id}
            date={entry.date.toDate()}
            content={entry.content}
          />
        ))}
      <ListSubheader>Done</ListSubheader>
      {entries
        .filter((entry) => entry.read)
        .map((entry) => (
          <Review
            key={entry.id}
            id={entry.id}
            date={entry.date.toDate()}
            content={entry.content}
          />
        ))}
    </List>
  );
}
