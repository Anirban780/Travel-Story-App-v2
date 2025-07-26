import { auth, provider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";

export const login = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

export const signup = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

export const googleSignIn = () => 
    signInWithPopup(auth, provider);

export const logout = () => 
    signOut(auth);

export const subscribeToAuth = (callback) => 
    onAuthStateChanged(auth, callback);