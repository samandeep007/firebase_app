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
        
        signInWithRedirect(this.auth, this.provider);
        const response = await getRedirectResult(this.auth);
        const credential = await GoogleAuthProvider.credentialFromResult(response)
        if (!credential.accessToken) {
            return null;
        }
        const user = await response.user;
        return user;   
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