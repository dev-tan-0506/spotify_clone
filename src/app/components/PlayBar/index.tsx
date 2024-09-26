/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Slider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SongPlaying from "./SongPlaying";
import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import {
  selectSongPlaying,
  selectPlaylist,
  selectIsPlaying,
  changePlayingSong,
  setIsPlaying,
  getIsNextSong,
  getIsPrevSong,
  selectIndexSongPlaying,
  selectIsShuffle,
  toggleShuffle,
  handleShufflePlaylist,
} from "@/app/stores/playingStore";
import { Song } from "@/app/interfaces/Song";

export default function PlayBar() {
  const songPlaying: Song = useAppSelector(selectSongPlaying);
  const playlistPlaying: Song[] = useAppSelector(selectPlaylist);
  const isPlaying: boolean = useAppSelector(selectIsPlaying);
  const isShuffle: boolean = useAppSelector(selectIsShuffle);
  const indexCurrentSong: number = useAppSelector(selectIndexSongPlaying);
  const isNextSong: boolean = useAppSelector(getIsNextSong);
  const isPrevSong: boolean = useAppSelector(getIsPrevSong);
  const dispatch = useAppDispatch();
  const musicEl = useRef<any>(null);
  const intervalPlaySong = useRef<any>(null);
  const [timePlayingSong, setTimePlayingSong] = useState<number>(0);

  const _startProgressPlayingSong = () => {
    intervalPlaySong.current = setInterval(() => {
      if (!musicEl.current) {
        return;
      }

      setTimePlayingSong((n) => (n += 1));
    }, 1000);
  };

  const handlePlaySong = (index?: number) => {
    if (index || index === 0) {
      dispatch(changePlayingSong(index));
      musicEl.current.src = playlistPlaying[index].link;
      musicEl.current.load();
      handleResetPlayingSong();
    }
    dispatch(setIsPlaying(true));
    musicEl.current.play();
    _startProgressPlayingSong();
  };

  const handlePauseSong = () => {
    dispatch(setIsPlaying(false));
    clearInterval(intervalPlaySong.current);
    intervalPlaySong.current = null;
    musicEl.current.pause();
  };

  const nextSong = () => {
    if (!isNextSong) {
      return;
    }
    handlePlaySong(indexCurrentSong + 1);
  };

  const backSong = () => {
    if (!isPrevSong) {
      return;
    }
    handlePlaySong(indexCurrentSong - 1);
  };

  const playSongWithTime = (time: number) => {
    if (time) {
      musicEl.current.currentTime = time;
      setTimePlayingSong(time as number);
    }
  };

  const playSong = () => {
    const newIsPlaying = !isPlaying;
    dispatch(setIsPlaying(newIsPlaying));
    if (newIsPlaying) {
      handlePlaySong();
    } else {
      handlePauseSong();
    }
  };

  const handleToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const displayTimeSong = (seconds: number) => {
    if (!seconds) {
      return "0:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const handleResetPlayingSong = () => {
    handlePauseSong();
    setTimePlayingSong(0);
  };

  useEffect(() => {
    const totalTimeSongPlaying = songPlaying?.durationSong || 0;
    if (timePlayingSong === totalTimeSongPlaying) {
      handleResetPlayingSong();

      if (isNextSong) {
        nextSong();
      }
    }
  }, [timePlayingSong]);

  useEffect(() => {
    dispatch(handleShufflePlaylist());
  }, [isShuffle]);

  return (
    <div className="w-full fixed bottom-0 bg-[#000000] px-[19.5px] py-[20px]">
      <div className="flex justify-between w-full">
        <SongPlaying songPlaying={songPlaying}></SongPlaying>
        <div className="max-w-[560px] w-full flex flex-col gap-[2px] justify-center">
          <ul className="text-[#B2B2B2] flex gap-[13px] text-[16px] items-center self-center">
            <div
              onClick={handleToggleShuffle}
              className={`flex item-center relative
              ${
                isShuffle &&
                "before:content-[''] before:w-[4px] before:h-[4px] before:bg-[#1DB954] before:rounded-full before:absolute before:top-[20px] before:left-[50%] before:translate-x-[-50%]"
              }`}
            >
              <i
                className={`fa-solid fa-shuffle hover:text-[#1DB954] relative ${
                  !playlistPlaying.length
                    ? "text-[#363636] cursor-not-allowed hover:text-[#363636]"
                    : "cursor-pointer"
                } ${isShuffle && "text-[#1DB954]"}`}
              ></i>
            </div>
            <i
              className={`fa-solid fa-backward-step hover:text-[#1DB954] ${
                !isPrevSong || !playlistPlaying.length
                  ? "text-[#363636] cursor-not-allowed hover:text-[#363636]"
                  : "cursor-pointer"
              }`}
              onClick={backSong}
            ></i>
            <div onClick={playSong}>
              <i
                className={`fa-solid fa-circle-${
                  isPlaying ? "pause" : "play"
                }  text-[28px] ${
                  !playlistPlaying.length
                    ? "text-[#363636] cursor-not-allowed"
                    : "cursor-pointer text-white"
                }`}
              ></i>
            </div>
            <i
              className={`fa-solid fa-forward-step hover:text-[#1DB954] ${
                !isNextSong || !playlistPlaying.length
                  ? "text-[#363636] cursor-not-allowed hover:text-[#363636]"
                  : "cursor-pointer"
              }`}
              onClick={nextSong}
            ></i>
            <i
              className={`fa-solid fa-repeat hover:text-[#1DB954] ${
                !playlistPlaying.length
                  ? "text-[#363636] cursor-not-allowed hover:text-[#363636]"
                  : "cursor-pointer"
              }`}
            ></i>
          </ul>
          <div className="text-[#B3B3B3] flex gap-[8px] text-[12px] items-center">
            <div className="text-nowrap">
              {playlistPlaying.length
                ? displayTimeSong(timePlayingSong)
                : "-:--"}
            </div>
            <Slider
              value={timePlayingSong}
              aria-label="Volume"
              defaultValue={0}
              size="small"
              max={songPlaying?.durationSong || 0}
              onChange={(_, value) => playSongWithTime(value as number)}
            />
            <div className="text-nowrap">
              {playlistPlaying.length
                ? displayTimeSong(songPlaying?.durationSong)
                : "-:--"}
            </div>
          </div>
        </div>
        <div className="text-[#B3B3B3] text-[12px] flex gap-[32px] items-center">
          <audio controls ref={musicEl} className="hidden">
            <source src={songPlaying?.link} type="audio/mpeg" />
          </audio>
          <ul className="flex gap-[8px]">
            <li className="cursor-pointer hover:text-[#1DB954]">
              <i className="fa-regular fa-address-card"></i>
            </li>
            <li className="cursor-pointer hover:text-[#1DB954]">
              <i className="fa-regular fa-list"></i>
            </li>
          </ul>
          <ul className="flex gap-[8px] items-center">
            <li className="cursor-pointer hover:text-[#1DB954]">
              <i className="fa-solid fa-laptop"></i>
            </li>
            <li className="cursor-pointer hover:text-[#1DB954]">
              <i className="fa-solid fa-volume-high"></i>
            </li>
            <li className="cursor-pointer hover:text-[#1DB954] w-[72px] flex items-center">
              <Slider
                aria-label="Volume"
                defaultValue={0}
                size="small"
                max={100}
              />
            </li>
            <li className="cursor-pointer hover:text-[#1DB954]">
              <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
