/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @next/next/no-img-element */

import { Song } from "@/app/interfaces/Song";

interface SongProps {
  song: Song;
  onPlay?: Function;
  indexSong?: number;
  isPlaying?: boolean;
  onPause?: Function;
  isNowPlaying?: boolean;
}

export default function SongRightNav({
  song,
  onPlay,
  indexSong,
  onPause,
  isPlaying,
  isNowPlaying,
}: SongProps) {
  return (
    <li className="songplaying p-[10px] flex gap-[15px] cursor-pointer hover:bg-[#1F1F1F] rounded-[8px]">
      <div
        className="w-[48px] h-[48px] thumb"
        onClick={() => {
          if (!isPlaying) {
            if (onPlay) {
              onPlay(indexSong);
            }
          } else {
            if (onPause) {
              onPause();
            }
          }
        }}
      >
        {isPlaying ? (
          <i className="icon-on-thumb fa-solid fa-pause fa-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></i>
        ) : (
          <i className="icon-on-thumb fa-solid fa-play fa-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></i>
        )}

        <img src={song.img} className="w-full h-full" alt="" />
      </div>
      <div>
        <div className={isNowPlaying ? 'text-[#1DB954]' : 'text-white'}>{song.name}</div>
        <div className="text-[#B2B2B2] singer">{song.singer}</div>
      </div>
    </li>
  );
}
