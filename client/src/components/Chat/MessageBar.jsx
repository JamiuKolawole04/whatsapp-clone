import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

function MessageBar() {
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
        />
      </div>
    </div>
  );
}

export default MessageBar;
