import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase.config";

const useAuthentification = () => {
  const auth = getAuth(app);
  const user = ref(null);

  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      // User is signed in
      console.log("User is authenticated:", authUser);
      user.value = authUser;
    } else {
      // No user is signed in
      console.log("User is not authenticated");
      user.value = null;
    }
  });
  return user;
};

export default useAuthentification;
