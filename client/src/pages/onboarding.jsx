import React from "react";
import Image from "next/image";

import whatsapp from "../../public/whatsapp.gif";
import { useStateProvider } from "@/context/StateContext";

function onboarding() {
  const [{ userInfo }] = useStateProvider();

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-normal gap-2">
        <Image src={whatsapp} alt="whatsapp" height={300} width={300} />

        <span className="text-7xl">whatsapp</span>
      </div>

      <h2 className="2xl">Create your profile</h2>

      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6"></div>
      </div>
    </div>
  );
}

export default onboarding;
