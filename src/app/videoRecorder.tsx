'use client';

import ReactVideoRecorder from 'react-video-recorder';
import React from 'react';
import { useRouter } from 'next/navigation';
import ChallengePrompts, { ChallengeQuery } from '@/const/challenges';

const VideoRecorderClient = () => {
  const [currentVideo, setCurrentVideo] = React.useState<Blob | null>(null);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const randomChallenge = ChallengePrompts[Math.floor(Math.random() * ChallengePrompts.length)];
  const router = useRouter();

  function resetVideo() {
    setCurrentVideo(null);
  }

  function handleClick() {
    if (!currentVideo) {
      console.warn('No video found!');
    }
    const formData = new FormData();
    const timeStamp = new Date().toISOString().replace(/[-:T]/g, '').replace(/\.\d\d\dZ/, '');
    formData.append('fileType', 'mp4');
    formData.append('fileName', `${timeStamp}_Video`);
    formData.append('fileToUpload', currentVideo!);
    formData.append('submit', 'Upload Video');
    const response = fetch('https://sandbox.luvdav.com/File_Upload/upload.php', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    resetVideo();
    router.push(`/done?${ChallengeQuery}=${randomChallenge.id}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 gap-4">
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