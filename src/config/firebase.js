import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../env.js'
import { getDatabase, ref, set } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getAuth } from "firebase/auth";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

class FirebaseApp {

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
        this.provider = new GoogleAuthProvider();
    }

    async signInWithGoogle() {
        const auth = getAuth();
        const response = await getRedirectResult(auth);
        const credential = GoogleAuthProvider.credentialFromResult(response);

        if (!credential.accessToken) {
            return null;
        }

        const user = result.user;
        return ({user, isLoggedIn: true})

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