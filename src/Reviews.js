import { LinearProgress, List, ListSubheader } from "@material-ui/core";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

import Review from "./Review.js";

export default function Reviews() {
  const { data: user } = useUser();
  const entriesRef = useFirestore()
    .collection("users")
    .doc(user.uid)
    .collection("entries")
    .orderBy("date", "desc")
    .limit(10);
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
