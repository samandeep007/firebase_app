import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../env.js'
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

class FirebaseApp {

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
        this.auth = getAuth();
        this.provider = new GoogleAuthProvider();

    }
    async loginWithGoogle() {
        try {
            const response = await signInWithPopup(this.auth, this.provider);
            const credential = GoogleAuthProvider.credentialFromResult(response)
            if (!credential || !credential.accessToken) {
                return null;
            }
            const user = response.user;
            return user;

        } catch (error) {
            console.error("Login failed", error);
            return null;
        }
    }

    async loginWithGithub(){
        try {
            const response = await signInWithPopup(this.auth, this.provider);
            const credential = GoogleAuthProvider.credentialFromResult(response)
            if (!credential || !credential.accessToken) {
                return null;
            }
            const user = response.user;
            return user;

        } catch (error) {
            console.error("Login failed", error);
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