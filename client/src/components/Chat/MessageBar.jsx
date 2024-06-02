import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";

function MessageBar() {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        from: userInfo?.id,
        to: currentChatUser?.id,
        message,
      });

      console.log({ data });
      setMessage("");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <div className="flex gap-6">
        <BsEmojiSmile
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Emoji"
        />

        <ImAttachment
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Attach file"
        />
      </div>

      <div className="w-full rounded-lg h-20 flex items-center">
        <input
          type="text"
          placeholder="type a message"
          className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
          onChange={({ target: { value } }) => setMessage(value)}
          value={message}
        />
      </div>

      <div className="flex w-10 items-center justify-center">
        <button>
          <MdSend
            className="text-panel-header-icon cursor-pointer text-xl"
            title="send message"
            onClick={sendMessage}
          />
          <FaMicrophone
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Record message"
          />
        </button>
      </div>
    </div>
  );
}

export default MessageBar;
