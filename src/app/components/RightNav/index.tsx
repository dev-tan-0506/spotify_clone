/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppSelector } from "@/app/stores/hooks";
import { selectPlayingState } from "@/app/stores/playingStore";
import QueuePlayingBar from "./QueuePlayingBar";
import SongPlayingDetailBar from "./SongPlayingDetailBar";

export default function RightNav() {
  const { isShowPlaylistPlayingBar, isShowSongPlayingDetailBar } =
    useAppSelector(selectPlayingState);
  return (
    <>
      {isShowPlaylistPlayingBar && <QueuePlayingBar></QueuePlayingBar>}
      {isShowSongPlayingDetailBar && (
        <SongPlayingDetailBar></SongPlayingDetailBar>
      )}
    </>
  );
}
