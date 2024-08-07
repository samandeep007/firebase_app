import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../env.js'
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

class FirebaseApp {

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
        this.provider = new GoogleAuthProvider();
        this.auth = getAuth();
    }

    async signInWithGoogle() {
       try {
         signInWithRedirect(this.auth, this.provider);

         const response = await getRedirectResult(this.auth);
         
         const credential = GoogleAuthProvider.credentialFromResult(response)
         if (!credential.accessToken) {
             return null;
         }
         const user = response.user;
         return user;

       } catch (error) {
            console.error("Sign-in failed", error);
            return null;
       }
    }

    addPost(data) {
        set(ref(this.database, "posts/" + Date.now().toString()), {
            title: data.title,
            description: data.description,
        });
    }
}

const firebaseApp = new FirebaseApp();
export default firebaseApp;