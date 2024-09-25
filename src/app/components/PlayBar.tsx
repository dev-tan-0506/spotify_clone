/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Slider } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Song {
  id: number;
  name: string;
  singer: string;
  likedSong: boolean;
  img: string;
  link: string;
  durationSong: number;
}

export default function PlayBar() {
  const musicEl = useRef<any>(null);
  const intervalPlaySong = useRef<any>(null);
  const [playlistPlaying, setPlaylistPlaying] = useState<Song[]>([]);
  const [timePlayingSong, setTimePlayingSong] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [indexSongPlaying, setIndexSongPlaying] = useState<number>(0);

  const _startProgressPlayingSong = () => {
    intervalPlaySong.current = setInterval(() => {
      if (!musicEl.current) {
        return;
      }

      setTimePlayingSong(n => n += 1);
    }, 1000);
  };

  const handlePlaySong = (index?: number) => {
    if (index) {
      setIndexSongPlaying(index);
      musicEl.current.src = playlistPlaying[index].link;
      musicEl.current.load();
    }

    setIsPlaying(true);
    musicEl.current.play();
    _startProgressPlayingSong();
  };

  const handlePauseSong = () => {
    setIsPlaying(false);
    clearInterval(intervalPlaySong.current);
    intervalPlaySong.current = null;
    musicEl.current.pause();
  }

  const nextSong = () => {
    if (indexSongPlaying === playlistPlaying.length - 1) {
      return;
    }
    handlePlaySong(indexSongPlaying + 1);
  };

  const backSong = () => {
    if (!indexSongPlaying) {
      return;
    }
    handlePlaySong(indexSongPlaying - 1);
  };

  const playSongWithTime = (time: number) => {
    if (time) {
      musicEl.current.currentTime = time;
      setTimePlayingSong(time as number);
    }
  };

  const playSong = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    if (newIsPlaying) {
      handlePlaySong();
    } else {
      handlePauseSong();
    }
  };

  const displayTimeSong = (seconds: number) => {
    if (!seconds) {
      return "-:--";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  }

  useEffect(() => {
    const totalTimeSongPlaying = playlistPlaying[indexSongPlaying]?.durationSong || 0;
    if (timePlayingSong === totalTimeSongPlaying) {
      handlePauseSong();
      setTimePlayingSong(0);

      if (indexSongPlaying + 1 <= playlistPlaying.length - 1) {
        nextSong();
      }
    }
  }, [timePlayingSong]);

  useEffect(() => {

  }, [])

  return (
    <div className="w-full fixed bottom-0 bg-[#000000] px-[19.5px] py-[20px]">
      <div className="flex justify-between w-full">
        <div className={`flex gap-[8px] items-center ${!playlistPlaying[indexSongPlaying] && 'invisible'}`}>
          <Image
            className="cursor-pointer"
            src={playlistPlaying[indexSongPlaying]?.img}
            width={48}
            height={48}
            alt={playlistPlaying[indexSongPlaying]?.name}
          />
          <div className="flex flex-col max-w-[100px] min-w-[100px] overflow-hidden">
            <div className="cursor-pointer text-white text-[14px]">
              {playlistPlaying[indexSongPlaying]?.name}
            </div>
            <div className="cursor-pointer text-[#B2B2B2] text-[12px]">
              {playlistPlaying[indexSongPlaying]?.singer}
            </div>
          </div>
          <ul className="flex gap-[8px] text-[#B2B2B2] text-[16px]">
            <i
              className={`fa-solid fa-heart hover:text-[#1DB954] cursor-pointer ${playlistPlaying[indexSongPlaying]?.likedSong &&
                "text-[#1DB954]"
                }`}
            ></i>
            <i className="fa-solid fa-circle-plus hover:text-[#1DB954] cursor-pointer"></i>
            <i className="fa-solid fa-list hover:text-[#1DB954] cursor-pointer"></i>
          </ul>
        </div>
        <div className="max-w-[560px] w-full flex flex-col gap-[2px] justify-center">
          <ul className="text-[#B2B2B2] flex gap-[13px] text-[16px] items-center self-center">
            <i className={`fa-solid fa-shuffle hover:text-[#1DB954] ${!playlistPlaying.length ?
              "text-[#363636] cursor-not-allowed hover:text-[#363636]" : "cursor-pointer"
              }`}></i>
            <i
              className={`fa-solid fa-backward-step hover:text-[#1DB954] ${!indexSongPlaying || !playlistPlaying.length ?
                "text-[#363636] cursor-not-allowed hover:text-[#363636]" : "cursor-pointer"
                }`}
              onClick={backSong}
            ></i>
            <div onClick={playSong}>
              <i
                className={`fa-solid fa-circle-${isPlaying ? "pause" : "play"
                  }  text-[28px] ${!playlistPlaying.length ?
                    "text-[#363636] cursor-not-allowed" : "cursor-pointer text-white"
                  }`}
              ></i>
            </div>
            <i
              className={`fa-solid fa-forward-step hover:text-[#1DB954] ${indexSongPlaying === playlistPlaying.length - 1 || !playlistPlaying.length ?
                "text-[#363636] cursor-not-allowed hover:text-[#363636]" : "cursor-pointer"
                }`}
              onClick={nextSong}
            ></i>
            <i className={`fa-solid fa-repeat hover:text-[#1DB954] ${!playlistPlaying.length ?
              "text-[#363636] cursor-not-allowed hover:text-[#363636]" : "cursor-pointer"
              }`}></i>
          </ul>
          <div className="text-[#B3B3B3] flex gap-[8px] text-[12px] items-center">
            <div className="text-nowrap">{playlistPlaying.length ? displayTimeSong(timePlayingSong) : "-:--"}</div>
            <Slider
              value={timePlayingSong}
              aria-label="Volume"
              defaultValue={0}
              size="small"
              max={playlistPlaying[indexSongPlaying]?.durationSong || 0}
              onChange={(_, value) => playSongWithTime(value as number)}
            />
            <div className="text-nowrap">{playlistPlaying.length ? displayTimeSong(playlistPlaying[indexSongPlaying]?.durationSong) : "-:--"}</div>
          </div>
        </div>
        <div className="text-[#B3B3B3] text-[12px] flex gap-[32px] items-center">
          <audio controls ref={musicEl} className="hidden">
            <source
              src={playlistPlaying[indexSongPlaying]?.link}
              type="audio/mpeg"
            />
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
