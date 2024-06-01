import React, { Fragment } from "react";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();

  console.log({ userInfo });

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>

      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
        />

        <Fragment>
          <BsThreeDotsVertical
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
          />
        </Fragment>
      </div>
    </div>
  );
}

export default ChatListHeader;
