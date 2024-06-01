import React from "react";
import { IoClose } from "react-icons/io5";

import avater1 from "../../../public/avatars/1.png";
import avater2 from "../../../public/avatars/2.png";
import avater3 from "../../../public/avatars/3.png";
import avater4 from "../../../public/avatars/4.png";
import avater5 from "../../../public/avatars/5.png";
import avater6 from "../../../public/avatars/6.png";
import avater7 from "../../../public/avatars/7.png";
import avater8 from "../../../public/avatars/8.png";
import avater9 from "../../../public/avatars/9.png";
import Image from "next/image";

function PhotoLibrary({ setImage, hidePhotoLibrary }) {
  const images = [
    avater1,
    avater2,
    avater3,
    avater4,
    avater5,
    avater6,
    avater7,
    avater8,
    avater9,
  ];
  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center">
      <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div
          className="pt-2 pe-2 cursor-pointer flex items-end justify-end"
          onClick={() => hidePhotoLibrary(false)}
        >
          <IoClose className="h-10 w-10 cursor-pointer" />
        </div>

        <div className="grid grid-cols-3 justify-center items-center gap-16 p-20 w-full">
          {images.map((image, index) => (
            <div
              key={index + 1}
              onClick={() => {
                setImage(images[index]);
                hidePhotoLibrary(false);
              }}
            >
              <div className="h-24 w-24 cursor-pointer relative">
                <Image src={image} alt="avatar" fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;
