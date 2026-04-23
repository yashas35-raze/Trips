// AuthContext.js
import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Generate random avatar
  const randomAvatar = () => {
    const num = Math.floor(Math.random() * 50) + 1;
    return `https://api.dicebear.com/7.x/thumbs/svg?seed=${num}`;
  };

  // ⭐ Signup with name + avatar → Firestore
  async function signup(name, email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const avatar = randomAvatar();

    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      avatar,
      createdAt: Date.now()
    });

    return result;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  // ⭐ Load User Profile after login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) setUserProfile(snap.data());
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>;
}
