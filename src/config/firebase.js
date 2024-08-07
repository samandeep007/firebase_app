import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../env.js'
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";


class FirebaseApp {

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
        this.auth = getAuth();
        this.googleProvider = new GoogleAuthProvider();
        this.facebookProvider = new FacebookAuthProvider();
        this.githubProvider = new GithubAuthProvider();

    }

       async loginWithGoogle() {
        try {
            const response = await signInWithPopup(this.auth, this.googleProvider);
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

    async loginWithFacebook(){
        try {
            const response = await signInWithPopup(this.auth, this.facebookProvider);
            const credential = FacebookAuthProvider.credentialFromResult(response)
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
            const response = await signInWithPopup(this.auth, this.githubProvider);
            const credential = GithubAuthProvider.credentialFromResult(response)
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