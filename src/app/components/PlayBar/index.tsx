/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Slider } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import SongPlaying from "./SongPlaying";
import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import {
  changePlayingSong,
  setIsPlaying,
  toggleShuffle,
  handleShufflePlaylist,
  selectPlayingState,
  setIsShowPlaylistPlayingBar,
  setIsShowSongPlayingDetailBar,
  getPlaylist,
} from "@/app/stores/playingStore";
import { Song } from "@/app/interfaces/Song";

export default function PlayBar() {
  const {
    playlistShuffled: playlist,
    playingSong: indexCurrentSong,
    isPlaying,
    isShuffle,
    isShowPlaylistPlayingBar,
    isShowSongPlayingDetailBar,
  } = useAppSelector(selectPlayingState);

  const songPlaying: Song = useMemo(
    () => playlist[indexCurrentSong] || null,
    [playlist, indexCurrentSong]
  );

  const isNextSong: boolean = useMemo(
    () => !!playlist[indexCurrentSong + 1],
    [playlist, indexCurrentSong]
  );

  const isPrevSong: boolean = useMemo(
    () => !!playlist[indexCurrentSong - 1],
    [playlist, indexCurrentSong]
  );

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

  const handlePlaySong = () => {
    resetIntervalPlaySong();
    musicEl.current.play();
    if (!isPlaying) {
      dispatch(setIsPlaying(true));
    }
    _startProgressPlayingSong();
  };

  const resetIntervalPlaySong = () => {
    clearInterval(intervalPlaySong.current);
    intervalPlaySong.current = null;
  };

  const handlePauseSong = () => {
    dispatch(setIsPlaying(false));
    resetIntervalPlaySong();
    musicEl.current.pause();
  };

  const nextSong = () => {
    if (!isNextSong) {
      return;
    }
    dispatch(changePlayingSong(indexCurrentSong + 1));
  };

  const backSong = () => {
    if (!isPrevSong) {
      return;
    }
    dispatch(changePlayingSong(indexCurrentSong - 1));
  };

  const playSongWithTime = (time: number) => {
    if (time) {
      musicEl.current.currentTime = time;
      setTimePlayingSong(time as number);
    }
  };

  const playSong = () => {
    if (!isPlaying) {
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

  const handleEnableSongPlayingDetailBar = () => {
    dispatch(setIsShowSongPlayingDetailBar(!isShowSongPlayingDetailBar));
  };

  const handleEnablePlaylistPlayingBar = () => {
    dispatch(setIsShowPlaylistPlayingBar(!isShowPlaylistPlayingBar));
  };

  useEffect(() => {
    const totalTimeSongPlaying = songPlaying?.durationSong || 0;
    if (timePlayingSong === totalTimeSongPlaying) {
      handlePauseSong();
      setTimePlayingSong(0);

      if (isNextSong) {
        nextSong();
      }
    }
  }, [timePlayingSong]);

  useEffect(() => {
    dispatch(handleShufflePlaylist());
  }, [isShuffle]);

  useEffect(() => {
    musicEl.current.src = songPlaying?.link_song || "";
    musicEl.current.load();
    if (isPlaying) {
      setTimePlayingSong(0);
      handlePlaySong();
    }
  }, [songPlaying]);

  useEffect(() => {
    if (isPlaying) {
      handlePlaySong();
    } else {
      handlePauseSong();
    }
  }, [isPlaying]);

  useEffect(() => {
    dispatch(getPlaylist());
  }, [dispatch]);

  return (
    <div className="w-full h-full bottom-0 bg-[#000000] px-[19.5px] py-[20px]">
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
                  !playlist.length
                    ? "text-[#363636] cursor-not-allowed hover:text-[#363636]"
                    : "cursor-pointer"
                } ${isShuffle && "text-[#1DB954]"}`}
              ></i>
            </div>
            <i
              className={`fa-solid fa-backward-step hover:text-[#1DB954] ${
                !isPrevSong || !playlist.length
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
                  !playlist.length
                    ? "text-[#363636] cursor-not-allowed"
                    : "cursor-pointer text-white"
                }`}
              ></i>
            </div>
            <i
              className={`fa-solid fa-forward-step hover:text-[#1DB954] ${
                !isNextSong || !playlist.length
                  ? "text-[#363636] cursor-not-allowed hover:text-[#363636]"
                  : "cursor-pointer"
              }`}
              onClick={nextSong}
            ></i>
            <i
              className={`fa-solid fa-repeat hover:text-[#1DB954] ${
                !playlist.length
                  ? "text-[#363636] cursor-not-allowed hover:text-[#363636]"
                  : "cursor-pointer"
              }`}
            ></i>
          </ul>
          <div className="text-[#B3B3B3] flex gap-[8px] text-[12px] items-center">
            <div className="text-nowrap">
              {playlist.length ? displayTimeSong(timePlayingSong) : "-:--"}
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
              {playlist.length
                ? displayTimeSong(songPlaying?.durationSong)
                : "-:--"}
            </div>
          </div>
        </div>
        <div className="text-[#B3B3B3] text-[12px] flex gap-[32px] items-center">
          <audio controls ref={musicEl} className="hidden">
            <source src={songPlaying?.link_song} type="audio/mpeg" />
          </audio>
          <ul className="flex gap-[8px]">
            <li
              className={`cursor-pointer hover:text-[#1DB954] ${
                isShowSongPlayingDetailBar && "text-[#1DB954]"
              }`}
              onClick={handleEnableSongPlayingDetailBar}
            >
              <i className="fa-regular fa-address-card"></i>
            </li>
            <li
              className={`cursor-pointer hover:text-[#1DB954] ${
                isShowPlaylistPlayingBar && "text-[#1DB954]"
              }`}
              onClick={handleEnablePlaylistPlayingBar}
            >
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
