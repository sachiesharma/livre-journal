import { collection, doc } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";

export function useEntries() {
  const { data: user } = useUser();
  const db = useFirestore();

  return collection(doc(collection(db, "users"), user.uid), "entries");
}
