'use client';

import React from "react";
import VideoStreamClient from "./videoStream";
import { useSearchParams } from 'next/navigation';

export default function Stream() {
  const searchParams = useSearchParams();
  const videoSource = searchParams.get("src") || "";
  const [currentVideoSource, setCurrentVideo] = React.useState<string>(videoSource);
  if (!currentVideoSource) {
    nextVideo();
  }

  function nextVideo() {
    console.log('lol');
    if (currentVideoSource === 'https://sandbox.luvdav.com/File_Upload/uploads/20230427113849_1_video.mp4') {
      setCurrentVideo('https://sandbox.luvdav.com/File_Upload/uploads/20230427100312_2_video.mp4');
    } else {
      setCurrentVideo('https://sandbox.luvdav.com/File_Upload/uploads/20230427113849_1_video.mp4');
    }
  }

  return (
    <VideoStreamClient
      videoSource={currentVideoSource}
      onVideoEnd={nextVideo}
    >
      <h1 className='text-6xl'>{currentVideoSource}</h1>
    </VideoStreamClient>
  );
}
