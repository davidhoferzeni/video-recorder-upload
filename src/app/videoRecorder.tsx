"use client";

import path from "path";
import ReactVideoRecorder from "react-video-recorder";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChallengePrompts, {
  ChallengeQuery,
  ChallengePrompt,
  CreateChallenge,
} from "@/const/challenges";
import fss from "@/configuration/fileserver.json";
import LoadingSpinner from "@/component/LoadingSpinner/LoadingSpinner";
import VideoActions from "@/component/VideoActions/VideoActions";

const VideoRecorderClient = () => {
  // const [countdownAudio, setAudio] = useState<HTMLAudioElement | null>(null);

  // useEffect(() => {
  //   setAudio(new Audio("./countdown.mp3")); // only call client
  // }, []);

  const [currentVideo, setCurrentVideo] = React.useState<Blob | null>(null);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [randomChallenge, setRandomChallenge] =
    React.useState<ChallengePrompt | null>(null);

  useEffect(() => {
    setRandomChallenge(
      ChallengePrompts[Math.floor(Math.random() * ChallengePrompts.length)]
    );
  }, []);
  useEffect(() => {
    if (currentVideo) {
      automaticUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  const router = useRouter();

  function resetVideo() {
    setCurrentVideo(null);
  }

  function wait(ms: number) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }

  async function automaticUpload() {
    await Promise.all([sendVideo(), wait(5000)]);
    // if (countdownAudio) {
    //   countdownAudio.pause();
    //   countdownAudio.currentTime = 0;
    // }
    resetVideo();
    changeSite();
  }

  function changeSite() {
    let uploadParams = new URLSearchParams();
    if (randomChallenge) {
      uploadParams.set(ChallengeQuery, randomChallenge.id.toString());
    }
    router.push(`/done?${uploadParams.toString()}`);
  }

  async function sendVideo() {
    if (!currentVideo) {
      console.warn("No video found!");
    }
    const createdChallenge = CreateChallenge(randomChallenge?.id || 0);
    const formData = new FormData();
    formData.append("fileType", "mp4");
    formData.append("fileName", createdChallenge.title);
    formData.append("fileToUpload", currentVideo!);
    formData.append("submit", "Upload Video");
    const uploadUrl = new URL(fss.url);
    uploadUrl.pathname = path.join(uploadUrl.pathname, fss.uploadAction);
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const message = "Error during upload!";
      console.warn(message);
      await wait(5000);
      await sendVideo();
    }
  }

  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-between p-8 gap-4">
      <ReactVideoRecorder
        renderActions={VideoActions}
        timeLimit={10000}
        wrapperClassName={"vid-recorder flex-auto h-64 btn-low"}
        onRecordingComplete={(videoBlob: Blob) => {
          setCurrentVideo(videoBlob);
        }}
        onStartRecording={() => {
          // countdownAudio?.play();
          setIsRecording(true);
        }}
        onStopRecording={() => {
          setIsRecording(false);
        }}
        onStopReplaying={resetVideo}
      />
      {isRecording && randomChallenge && (
        <p className="text-3xl">{randomChallenge.challenge}</p>
      )}
      {currentVideo && (
        <div className="flex flex-row items-center justify-between p-8 gap-4">
          <p className="text-2xl">Sending ...</p>
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
    </main>
  );
};

export default VideoRecorderClient;
