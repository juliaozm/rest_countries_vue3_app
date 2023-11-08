import { ref, onValue } from "firebase/database";
import { database } from "../../../firebase.config";

export const getCountries = (uid, countries) => {
  const userCountryRef = ref(database, `users/${uid}/${countries}`);

  return new Promise((resolve, rejected) => {
    onValue(userCountryRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        resolve(data);
      } else {
        rejected(new Error("No wanted countries yet"));
      }
    });
  });
};
