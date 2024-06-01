import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

import whatsapp from "../../public/whatsapp.gif";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import defaultImage from "../../public/default_avatar.png";
import Avatar from "@/components/common/Avatar";
import { ONBAORD_USER_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";

function onboarding() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      router.push("/login");
    } else {
      if (!newUser && userInfo?.email) {
        router.push("/");
      }
    }
  }, [newUser, userInfo, router]);

  const handleOnboardUser = async () => {
    if (validateDetails()) {
      const email = userInfo.email;

      try {
        const {
          data: { status, user },
        } = await axios.post(ONBAORD_USER_ROUTE, {
          name,
          email,
          image: image.blurDataURL,
          about,
        });

        if (status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });

          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: user.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });

          router.push("/");
        }
      } catch (error) {
        alert(error.response.data?.message);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }

    return true;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-normal gap-2">
        <Image src={whatsapp} alt="whatsapp" height={300} width={300} />

        <span className="text-7xl">whatsapp</span>
      </div>

      <h2 className="2xl">Create your profile</h2>

      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div>
            <button
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
              onClick={handleOnboardUser}
            >
              Create Profile
            </button>
          </div>
        </div>

        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
