'use client';

import useSWR, { Fetcher } from 'swr'
import React from "react";
import { useSearchParams } from 'next/navigation';
import fss from '@/configuration/fileserver.json'
import path from "path";
import { ChallengeData, GetChallengeByTitle } from '@/const/challenges';
import VideoPlayerClient from "./videoPlayer";

const fetcher: Fetcher<ChallengeData[]> = () => getVideos();

async function getVideos() {
  const listUrl = new URL(fss.url);
  listUrl.pathname = path.join(listUrl.pathname, fss.listAction);
  const response = await fetch(listUrl);
  const challengeRecords = await response.json();
  const videoTitles = challengeRecords.uploads;
  const videoList = videoTitles.map(GetChallengeByTitle);
  return videoList;
}

export default function Stream() {
  const searchParams = useSearchParams();
  const videoSource = searchParams.get("src") || "";

  const { data, error, isLoading } = useSWR(videoSource? null: 'load', fetcher, { refreshInterval: 120000 });
  if (error) return <h1>failed to load</h1>;
  if (isLoading) return <h1>loading...</h1>;

  let videos: ChallengeData[];

  if (!videoSource && data) {
    videos = data;
  } else {
    const challengeSource = GetChallengeByTitle(videoSource);
    videos = [challengeSource];
  }

  if (videos) {
    return (
      <VideoPlayerClient
        videos={videos}
      ></VideoPlayerClient>
    );
  } else {
    return (
      <div>Is loading</div>
    );
  }
}
