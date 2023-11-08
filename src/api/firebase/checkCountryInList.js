import { ref, onValue } from "firebase/database";
import { database } from "../../../firebase.config";

export const checkCountryInList = (uid, cca2, countries) => {
  const userCountryRef = ref(database, `users/${uid}/${countries}/${cca2}`);
  return new Promise((resolve) => {
    onValue(
      userCountryRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
};
