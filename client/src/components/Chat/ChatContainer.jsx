import React from "react";
import dynamic from "next/dynamic";

import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
// import VoiceMessage from "./VoiceMessage";

const VoiceMessage = dynamic(() => import("./VoiceMessage"), { ssr: false });

function ChatContainer() {
  const [{ messages, userInfo, currentChatUser }] = useStateProvider();

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      {/* <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0">
        <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
          <div className="flex w-full">
            <div
              className="flex flex-col justify-end w-full gap-1 overflow-auto
          "
            >
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message?.senderId === currentChatUser?.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <p className="">{message.message}</p>
                  <p>I am here</p>

                  {message.type === "text" && (
                    <div
                      className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                        message.senderId === currentChatUser?.id
                          ? "bg-incoming-background"
                          : "bg-outgoing-background"
                      }`}
                    >
                      {console.log("ok", message.message)}
                      <span className="break-all">{message?.message}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex py-6 px-2 ${
            message?.senderId === currentChatUser?.id
              ? "justify-start"
              : "justify-end"
          }`}
        >
          {message.type === "text" && (
            <div
              className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                message.senderId === currentChatUser?.id
                  ? "bg-incoming-background"
                  : "bg-outgoing-background"
              }`}
            >
              <span className="break-all">{message?.message}</span>
              <div className="flex gap-1 items-end">
                <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                  {calculateTime(message?.createdAt)}
                </span>

                <span>
                  {message?.senderId === userInfo.id && (
                    <MessageStatus messageStatus={message?.status} />
                  )}
                </span>
              </div>
            </div>
          )}

          {message.type === "image" && <ImageMessage message={message} />}
          {message.type === "audio" && <VoiceMessage message={message} />}
        </div>
      ))}
    </div>
  );
}

export default ChatContainer;
