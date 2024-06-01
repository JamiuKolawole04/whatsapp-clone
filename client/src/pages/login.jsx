import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import whatsapp from "../../public/whatsapp.gif";
import { firebaseAuth } from "@/utils/FirebaseConfig";

function login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src={whatsapp} alt="whatsapp" height={300} width={300} />

        <span className="text-7xl">whatsapp</span>
      </div>

      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle className="text-4xl" />

        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default login;
