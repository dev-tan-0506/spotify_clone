/* eslint-disable @next/next/no-img-element */
import { Song } from "@/app/interfaces/Song";

interface SongPlayingProps {
    songPlaying: Song;
}

export default function SongPlaying({ songPlaying }: SongPlayingProps) {
    return (
        <div className={`flex gap-[8px] items-center ${!songPlaying && 'invisible'}`}>
            <img
                className="cursor-pointer rounded-[5px]"
                src={songPlaying?.thumb}
                style={{ width: "48px", aspectRatio: "1" }}
                alt={songPlaying?.name}
            />
            <div className="flex flex-col max-w-[100px] min-w-[100px] overflow-hidden">
                <div className="cursor-pointer text-white text-[14px]">
                    {songPlaying?.name}
                </div>
                <div className="cursor-pointer text-[#B2B2B2] text-[12px]">
                    {songPlaying?.singer}
                </div>
            </div>
            <ul className="flex gap-[8px] text-[#B2B2B2] text-[16px]">
                <i
                    className={`fa-solid fa-heart hover:text-[#1DB954] cursor-pointer ${songPlaying?.likedSong &&
                        "text-[#1DB954]"
                        }`}
                ></i>
                <i className="fa-solid fa-circle-plus hover:text-[#1DB954] cursor-pointer"></i>
                <i className="fa-solid fa-list hover:text-[#1DB954] cursor-pointer"></i>
            </ul>
        </div>
    );
}
