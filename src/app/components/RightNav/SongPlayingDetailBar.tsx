'use client'
import { useAppSelector } from "@/app/stores/hooks";
import Bar from "../Bar";
import { selectPlayingState } from "@/app/stores/playingStore";
import { useMemo } from "react";

export default function SongPlayingDetailBar() {
  const { playlist, playingSong: indexCurrentSong } = useAppSelector(selectPlayingState);
  const songPlaying = useMemo(() => playlist[indexCurrentSong], [playlist, indexCurrentSong]);

  return <Bar>
    <div className="p-[15px] h-[87vh]">
      <div className="flex items-center justify-between mb-[15px]">
        <div className="font-semibold">{songPlaying.name}</div>
        <ul className="flex gap-[10px]">
          <li>
            <i className="fa-solid fa-ellipsis"></i>
          </li>
          <li>
            <i className="fa-solid fa-xmark"></i>
          </li>
        </ul>
      </div>
      <div className="max-h-[93%] h-full overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
        <img src={songPlaying.thumb} alt="" className="w-full aspect-square rounded-[10px] mb-[15px]" />
        <div className="flex items-center justify-between mb-[15px]">
          <div className="w-[80%] overflow-hidden text-nowrap">
            <div className="text-[25px] font-bold">{songPlaying.name}</div>
            <div className="text-[#B2B2B2]">{songPlaying.singer}</div>
          </div>
          <ul className="flex gap-[10px]">
            <li><i className="fa-solid fa-copy"></i></li>
            <li><i className="fa-solid fa-circle-plus"></i></li>
          </ul>
        </div>
        <div>
          <div className="rounded-t-[10px] overflow-hidden relative cursor-pointer">
            <div className="font-bold absolute top-[8%] left-[5%]">Giới thiệu về nghệ sĩ</div>
            <img src={songPlaying.thumb} alt="" className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="p-[15px] bg-[#1F1F1F] flex items-center justify-between gap-[10px] rounded-b-[10px]">
            <div className="flex flex-col gap-[8px] cursor-pointer">
              <div className="cursor-pointer hover:underline font-semibold">{songPlaying.singer}</div>
              <div className="text-[#b2b2b2]">1.688.609 người nghe hàng tháng</div>
              <div className="text-[#b2b2b2]">ai cũng phải bắt đầu từ đâu đó</div>
            </div>
            <div className="w-[120px]">
              <button className="px-[15px] py-[5px] bg-[#1F1F1F] rounded-full border-solid border border-[#fff] text-[12px] font-bold hover:scale-110">Theo dõi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Bar>;
}
