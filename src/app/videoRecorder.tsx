'use client';

import path from 'path';
import ReactVideoRecorder from 'react-video-recorder';
import React from 'react';
import { useRouter } from 'next/navigation';
import ChallengePrompts, { ChallengeQuery, ChallengeTitle } from '@/const/challenges';
import fss from '@/configuration/fileServer.json'

const VideoRecorderClient = () => {
  const [currentVideo, setCurrentVideo] = React.useState<Blob | null>(null);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const randomChallenge = ChallengePrompts[Math.floor(Math.random() * ChallengePrompts.length)];
  const router = useRouter();

  function resetVideo() {
    setCurrentVideo(null);
  }

  async function handleClick() {
    if (!currentVideo) {
      console.warn('No video found!');
    }
    const formData = new FormData();
    formData.append('fileType', 'mp4');
    formData.append('fileName', ChallengeTitle(randomChallenge.id));
    formData.append('fileToUpload', currentVideo!);
    formData.append('submit', 'Upload Video');
    const uploadUrl = new URL(fss.url);
    uploadUrl.pathname = path.join(uploadUrl.pathname, fss.uploadAction);
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    })
    if (!response.ok) {
      const message = "Error during upload!";
      console.warn(message);
      throw message
    }
    resetVideo();
    let uploadParams = new URLSearchParams();
    uploadParams.set(ChallengeQuery, randomChallenge.id.toString());
    router.push(`/done?${uploadParams.toString()}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 gap-4">
      <ReactVideoRecorder
        timeLimit={30000}
        wrapperClassName={'vid-recorder flex-auto h-64 btn-low'}
        onRecordingComplete={(videoBlob: Blob) => {
          setCurrentVideo(videoBlob);
        }}
        onStartRecording={() => {setIsRecording(true)}}
        onStopRecording={() => {setIsRecording(false)}}
        onStopReplaying={resetVideo}
      />
      {/* {isRecording &&
        <p className='text-6xl'>
          {randomChallenge.label}
        </p>
      } */}
      {currentVideo &&
        <button
          onClick={handleClick}
          className='btn btn-blue flex-initial h-12'
        >
          Senden!
        </button>
      }
    </main>
  );
}

export default VideoRecorderClient;