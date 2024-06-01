import React, { useEffect } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";

import whatsapp from "../../public/whatsapp.gif";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo?.id && !newUser) {
      router.push("/");
    } else {
    }
  }, [userInfo, newUser]);
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const {
          data: { data },
        } = await axios.post(CHECK_USER_ROUTE, { email });

        dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });

        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            id: data.id,
            name: data.name,
            email: data.email,
            profileImage: data.profilePicture,
            status: data?.status,
          },
        });
      }
    } catch (error) {
      if (error.response.data?.message === "user not found") {
        dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });

        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            name,
            email,
            profileImage,
            status: "",
          },
        });

        router.push("/onboarding");
      }
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
