/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import {
  getPlaylist,
  selectNextSongs,
  selectSongPlaying,
} from "@/app/stores/playingStore";
import SongRightNav from "./Song";

interface Tab {
  name: string;
  display: string;
}

export default function RightNav() {
  const dispatch = useAppDispatch();
  const nextPlaylist = useAppSelector(selectNextSongs);
  const songPlaying = useAppSelector(selectSongPlaying);
  const [tabSelected, setTabSelected] = useState<string>("queue");
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

  const handleSelectTab = (tab: string) => {
    if (tab) {
      setTabSelected(tab);
    }
  };

  useEffect(() => {
    dispatch(getPlaylist());
  }, [dispatch]);

  return (
    <div className="bg-[#000] text-white p-[8px] w-[18%]">
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
      <div>
        <div className="px-[10px] py-[5px] text-[16px] font-semibold">
          Now playing
        </div>
        <SongRightNav song={songPlaying}></SongRightNav>
      </div>
      <ul className="mt-[10px]">
        <div className="px-[10px] py-[5px] text-[16px] font-semibold">
          Next from:
        </div>
        {nextPlaylist.map((song) => (
          <SongRightNav key={song.id} song={song}></SongRightNav>
        ))}
      </ul>
    </div>
  );
}
