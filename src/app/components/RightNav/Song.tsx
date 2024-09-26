/* eslint-disable @next/next/no-img-element */

import { Song } from "@/app/interfaces/Song";

interface SongProps {
  song: Song;
}

export default function SongRightNav({ song }: SongProps) {
  return (
    <li className="p-[10px] flex gap-[15px] cursor-pointer hover:bg-[#1F1F1F] rounded-[8px]">
      <div>
        <img
          src={song.img}
          alt=""
          style={{ width: "48px", aspectRatio: "1" }}
        />
      </div>
      <div>
        <div className="text-white">{song.name}</div>
        <div className="text-[#B2B2B2]">{song.singer}</div>
      </div>
    </li>
  );
}
