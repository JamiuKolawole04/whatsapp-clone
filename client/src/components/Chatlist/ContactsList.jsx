import axios from "axios";
import React, { useEffect, useState } from "react";

import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [{}, dispatch] = useStateProvider();

  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContacts, setSearchContacts] = useState([]);

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = {};

      Object.keys(allContacts).forEach((key) => {
        filteredData[key] = allContacts[key].filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setSearchContacts(filteredData);
    } else {
      setSearchContacts(allContacts);
    }
  }, [searchTerm]);

  const getContacts = async () => {
    try {
      const {
        data: { users },
      } = await axios.get(GET_ALL_CONTACTS);

      setAllContacts(users);
      setSearchContacts(users);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACT_PAGE })
            }
          />

          <span>New Chat</span>
        </div>
      </div>

      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14 w-full">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
            </div>

            <div>
              <input
                type="text"
                placeholder="Search contact"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
                value={searchTerm}
                onChange={({ target: { value } }) => setSearchTerm(value)}
              />
            </div>
          </div>
        </div>

        {Object.entries(searchContacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              {userList.length && (
                <div className="text-teal-light pl-10 py-5">
                  {initialLetter}
                </div>
              )}

              {userList.map((contact) => (
                <ChatLIstItem
                  data={contact}
                  isContactPage={true}
                  key={contact.id}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
