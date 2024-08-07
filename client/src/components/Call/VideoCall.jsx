import dynamic from "next/dynamic";
import React from "react";

import { useStateProvider } from "@/context/StateContext";

const Container = dynamic(() => import("./Container"), { ssr: false });

function VideoCall() {
  const [{ userInfo, socket, videoCall }, dispatch] = useStateProvider();

  return <Container data={videoCall} />;
}

export default VideoCall;
