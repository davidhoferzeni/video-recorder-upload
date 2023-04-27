'use client';

import React from "react";
import VideoStreamClient from "./videoStream";
import { useSearchParams } from 'next/navigation';
import fss from '@/configuration/fileserver.json'
import path from "path";
import challengeList, { ChallengeData, GetChallengeByTitle } from '@/const/challenges';
import { get } from "http";


async function getVideos() {
  const listUrl = new URL(fss.url);
  listUrl.pathname = path.join(listUrl.pathname, fss.listAction);
  const response = await fetch(listUrl);
  const challengeRecords = await response.json();
  const videoTitles = challengeRecords.uploads;
  const videoList = videoTitles.map(GetChallengeByTitle);
  console.log(videoList);
  return videoList;
}

export default async function Stream() {

  const searchParams = useSearchParams();
  const videoSource = searchParams.get("src") || "";
  let currentVideo: ChallengeData;
  const videos = await getVideos();
  if (!videoSource) {
    // Initiate both requests in parallel
    currentVideo = videos[0];
  } else {
    const challengeSource = GetChallengeByTitle(videoSource);
    currentVideo = challengeSource;
  }
  function nextVideo() {
    currentVideo = videos[1];
  }
  
  return (
    <VideoStreamClient
      videoSource={currentVideo?.url ?? ""}
      onVideoEnd={nextVideo}
    >
      <h1 className='text-6xl'>{currentVideo?.label ?? ""}</h1>
    </VideoStreamClient>
  );
}
