import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../env.js'
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


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

    async registerWithEmail(email, password, otherDetails){
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
            if (!userCredential) {
                return null;
            }
            console.log("hiho")
            await updateProfile(userCredential.user, {...otherDetails})
            const user = userCredential.user;
            return user;
        } catch (error) {
            console.error("Registration failed", error);
            return null;
        }
    }

    async loginWithEmail(email, password){
        try {
            const credential = await signInWithEmailAndPassword(this.auth, email, password);
            if (!credential) {
                return null;
            }
            const user = credential.user;
            return user;

        } catch (error) {
            console.error("Login failed", error);
            return null;
        }
    }

}

const firebaseApp = new FirebaseApp();
export default firebaseApp;