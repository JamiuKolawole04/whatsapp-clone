import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE, GET_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter();

  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);

    if (!userInfo && currentUser?.email) {
      const {
        data: { data, status },
      } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });

      if (!status) {
        router.push("/login");
      }

      if (data) {
        const { id, name, email, profilePicture: profileImage, status } = data;

        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            id,
            name,
            email,
            profileImage,
            status,
          },
        });
      }
    }
  });

  const geMessages = async () => {
    try {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGE_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );

      dispatch({
        type: reducerCases.SET_MESSAGE,
        messages,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (currentChatUser?.id) {
      geMessages();
    }
  }, [currentChatUser]);

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />

      {currentChatUser ? <Chat /> : <Empty />}
    </div>
  );
}

export default Main;
