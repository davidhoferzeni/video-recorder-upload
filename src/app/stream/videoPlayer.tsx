import { useState } from "react";
import VideoStreamClient from "./videoStream";
import { ChallengeData } from "@/const/challenges";

export default function VideoPlayerClient({
  videos,
}: {
  videos: ChallengeData[];
}) {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  function nextVideo() {
    if (videos.length === 1) {
      return;
    }
    const currentIndex = videos.indexOf(currentVideo);
    const nextVideoIndex =
      currentIndex < videos.length - 1 && currentIndex >= 0
        ? currentIndex + 1
        : 0;
    setCurrentVideo(videos[nextVideoIndex]);
  }
  if (videos.length <= 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-4">
        <h1 className="text-6xl">Keine Videos verfügbar!</h1>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-4">
      <VideoStreamClient
        videoSource={currentVideo.url}
        onVideoEnd={nextVideo}
        loop={videos.length === 1}
      ></VideoStreamClient>
      <h1 className="text-3xl">{currentVideo.label}</h1>
      {/* <h1 className="text-6xl">{currentVideo.dateRecorded.toLocaleString()}</h1> */}
    </div>
  );
}
