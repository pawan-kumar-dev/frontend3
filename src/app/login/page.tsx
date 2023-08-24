"use client";
import React from "react";
import { auth, googleAuthProvider, userRef } from "../../utils/firebase";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../utils/localStorage-utils";
import { signInWithPopup } from "firebase/auth";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const { push } = useRouter();

  const loggedInUser = getDataFromLocalStorage("loggedInUser");
  const userId = loggedInUser?.uid;
  const signIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(function (result) {
        if (result && result.user) {
          const userObj = {
            uid: result.user?.uid,
            displayName: result.user?.displayName,
            email: result.user?.email,
          };

          const userQuery = query(userRef, where("uid", "==", userObj.uid));

          getDocs(userQuery).then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot?.docs[0];
              if (userDoc && userDoc?.id) {
                setDataInLocalStorage("loggedInUser", userObj);
                toast.success("loggedIn Success");
                push("/");
              }
            } else {
              addDoc(userRef, { ...userObj })
                .then(() => {
                  setDataInLocalStorage("loggedInUser", userObj);
                  toast.success("Welcome to your Task Manager App");
                  push("/");
                })
                .catch((error) => {
                  if (error && error.message) {
                    let errorMessage = error.message || "Failed to login";
                    toast.error(errorMessage);
                  }
                });
            }
          });
        } else {
          let errorMessage = "Failed to login";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        let errorMessage = error.message || "Failed to login";
        toast.error(errorMessage);
      });
  };

  if (userId && typeof window !== "undefined") {
    return redirect("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 text-center">
          Task Manager
        </h2>
        <button
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={signIn}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
