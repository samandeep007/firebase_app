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

    signInWithGoogle(){
        const auth = getAuth();
        getRedirectResult(auth)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if(credential.accessToken){
                
            };
        
          
            const user = result.user;
           
          }).catch((error) => {
          
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

          });

    }

    addPost(data){
        set(ref(this.database, "posts/" + Date.now().toString()), {
            title: data.title,
            description: data.description,
          });
    }
}

const firebaseApp = new FirebaseApp();
export default firebaseApp;