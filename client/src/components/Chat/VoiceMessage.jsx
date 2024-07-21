import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPause, FaPlay } from "react-icons/fa";

import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/ApiRoutes";
import Avatar from "../common/Avatar";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";

function VoiceMessage({ message }) {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();

  const [audioMessage, setAudioMessage] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedAudio, setrenderedAudio] = useState(null);

  const waveFormRef = useRef(null);
  const waveform = useRef(null);
  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      waveform.current.on("finish", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      waveform.current.destroy();
    };
  }, []);

  useEffect(() => {
    const audioUrl = `${HOST}/${message.message}`;
    const audio = new Audio(audioUrl);
    setAudioMessage(audio);
    waveform.current.load(audioUrl);
    waveform.current.on("ready", () => {
      setTotalDuration(waveFormRef.current.getDuration());
    });
  }, [message.message]);

  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };

      audioMessage.addEventListener("timeupdate", updatePlaybackTime);

      return () => {
        audioMessage.addEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  console.log({ audioMessage });

  const hanldePlayAudio = () => {
    if (audioMessage) {
      waveform.current.stop();
      waveform.current.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };
  const handlePauseAudio = () => {
    waveform.current.stop();
    audioMessage.pause();
    setIsPlaying(false);
  };
  return (
    <div
      className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm ${
        message.senderId === currentChatUser?.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div>
        <Avatar type="lg" image={currentChatUser?.profilePicture} />
      </div>

      <div className="cursor-pointer text-xl">
        {!isPlaying ? (
          <FaPlay onClick={hanldePlayAudio} />
        ) : (
          <FaPause onClick={handlePauseAudio} />
        )}
      </div>

      <div className="relative">
        <div className="w-60" ref={waveFormRef} />
        <div className="text-bubble-meta text-[11px] pt-1 flex justify-between">
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>

          <div className="flex gap-1">
            <span>{calculateTime(message.createdAt)}</span>

            <span className="text-bubble-meta">
              {message?.senderId === userInfo.id && (
                <MessageStatus messageStatus={message?.status} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceMessage;
