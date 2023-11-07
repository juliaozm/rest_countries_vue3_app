import { ref, set } from "firebase/database";
import { database } from "../../../firebase.config";

export const writeUserData = (uid, email) => {
  set(ref(database, "users/" + uid), {
    email: email,
    visitedCountries: {},
    wantedCountries: {},
  })
    .then(() => {
      console.info(
        "The user's profile has been successfully added to the database"
      );
    })
    .catch((error) => {
      console.error("Error creating user profile:", error);
    });
};
