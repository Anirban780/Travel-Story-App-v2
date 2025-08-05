import { useNavigate } from 'react-router-dom';
import { auth, provider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect } from 'react';

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

export const checkCurrentUser = () => auth.currentUser;

export const useCheckAuthAndRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
};
