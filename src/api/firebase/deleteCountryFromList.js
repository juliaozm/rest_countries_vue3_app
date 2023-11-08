import { ref, remove } from "firebase/database";
import { database } from "../../../firebase.config";

export const deleteCountryFromList = (uid, cca2, countries) => {
  const userCountryRef = ref(database, `users/${uid}/${countries}/${cca2}`);

  return new Promise((resolve, reject) => {
    remove(userCountryRef)
      .then(() => {
        resolve(`A country was deleted from your list!`);
      })
      .catch((error) => {
        reject(new Error("A country can't be deleted"));
      });
  });
};
