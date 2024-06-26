import React from "react";

import whatssap from "../../public/whatsapp.gif";
import Image from "next/image";

function Empty() {
  return (
    <div className="border-conversation-border border-1 w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center">
      <Image src={whatssap} alt="whatsapp" height={300} width={300} />
    </div>
  );
}

export default Empty;
