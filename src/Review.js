import { Divider, ListItem, ListItemText } from "@material-ui/core";

import { Link } from "react-router-dom";

export default function Review({ id, date, content }) {
  return (
    <>
      <ListItem button component={Link} to={`/editor/${id}`}>
        <ListItemText
          secondary={
            date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }) +
            " • " +
            date.toLocaleTimeString()
          }
        >
          {content}
        </ListItemText>
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
}
