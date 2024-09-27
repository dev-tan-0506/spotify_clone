/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import {
  changePlayingSong,
  selectPlayingState,
  setIsPlaying,
  setIsShowPlaylistPlayingBar,
} from "@/app/stores/playingStore";
import SongRightNav from "./Song";
import { Song } from "@/app/interfaces/Song";
import Bar from "../Bar";

interface Tab {
  name: string;
  display: string;
}

const tabs: Tab[] = [
  {
    name: "queue",
    display: "Queue",
  },
  {
    name: "recently-played",
    display: "Recently played",
  },
];

export default function QueuePlayingBar() {
  const dispatch = useAppDispatch();
  const {
    playlistShuffled: playlist,
    playingSong: indexCurrentSong,
    isPlaying,
  } = useAppSelector(selectPlayingState);
  const songPlaying: Song = useMemo(
    () => playlist[indexCurrentSong] || {},
    [playlist, indexCurrentSong]
  );
  const [tabSelected, setTabSelected] = useState<string>("queue");

  const handleSelectTab = (tab: string) => {
    if (tab) {
      setTabSelected(tab);
    }
  };

  const handlePlaySong = (index: number) => {
    if (index) {
      dispatch(changePlayingSong(index));
    } else {
      dispatch(setIsPlaying(true));
    }
  };

  const handlePauseSong = () => {
    dispatch(setIsPlaying(false));
  };

  const handleClosePlaylistPlayingBar = () => {
    dispatch(setIsShowPlaylistPlayingBar(false));
  };

  return (
    <Bar>
      <div className="flex items-center justify-between">
        <ul className="flex text-[14px]">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              onClick={() => handleSelectTab(tab.name)}
              className={`px-[10px] py-[15px] cursor-pointer text-[#B2B2B2] font-semibold relative hover:bg-[#1F1F1F] ${
                tab.name === tabSelected &&
                "text-white before:content-[''] before:w-[75%] before:h-[4px] before:rounded-full before:absolute before:bottom-[2px] before:left-[50%] before:translate-x-[-50%] before:bg-[#1ED760]"
              }`}
            >
              {tab.display}
            </li>
          ))}
        </ul>
        <i
          className="fa-solid fa-xmark pr-[10px] pb-[5px] cursor-pointer fa-lg hover:text-[#1DB954]"
          onClick={handleClosePlaylistPlayingBar}
        ></i>
      </div>
      <div>
        <div className="px-[10px] py-[5px] text-[16px] font-semibold">
          Now playing
        </div>
        <SongRightNav
          isNowPlaying={true}
          song={songPlaying}
          isPlaying={isPlaying}
          onPlay={handlePlaySong}
          onPause={handlePauseSong}
        ></SongRightNav>
      </div>
      {indexCurrentSong < playlist.length - 1 && (
        <ul className="mt-[10px]">
          <div className="px-[10px] py-[5px] text-[16px] font-semibold">
            Next from:
          </div>
          {playlist.map(
            (song, index) =>
              index > indexCurrentSong && (
                <SongRightNav
                  onPlay={handlePlaySong}
                  key={song.id}
                  indexSong={index}
                  song={song}
                ></SongRightNav>
              )
          )}
        </ul>
      )}
    </Bar>
  );
}
