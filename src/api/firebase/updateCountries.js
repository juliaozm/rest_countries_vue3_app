import { ref, update } from "firebase/database";
import { database } from "../../../firebase.config";

export const updateCountries = (
  uid,
  { cca2, name: { common }, flags: { svg } },
  countries
) => {
  const userCountryRef = ref(database, `users/${uid}/${countries}/${cca2}`);

  const updateData = {
    code: cca2,
    name: common,
    flag: svg,
  };
  return new Promise((resolve, reject) => {
    update(userCountryRef, updateData)
      .then(() => {
        resolve(`A country was added to your list!`);
      })
      .catch((error) => {
        reject(new Error("A country can't be added to your list"));
      });
  });
};
