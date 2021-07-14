import { useUser } from "reactfire";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

export default function AvatarHeader() {
  const { data: user } = useUser();
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </ListItemAvatar>
        <ListItemText primary={"Hi " + user.displayName} secondary={date} />
      </ListItem>
    </List>
  );
}
