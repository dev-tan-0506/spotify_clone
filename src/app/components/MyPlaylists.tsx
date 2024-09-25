"use client";

import { useState } from "react";

interface SubPlaylist {
  alias: string;
  name: string;
}

interface Playlist extends SubPlaylist {
  subPlaylists?: SubPlaylist[];
}

export default function MyPlaylists() {
  const [playlistSelected, setPlaylistSelected] = useState<string>("");
  const playlists: Playlist[] = [
    {
      alias: "hip-hop",
      name: "Hip-Hop",
    },
    {
      alias: "pop",
      name: "Pop",
    },
    {
      alias: "rock",
      name: "Rock",
    },
    {
      alias: "collaborative",
      name: "Collaborative",
    },
    {
      alias: "classic",
      name: "Classic",
    },
    {
      alias: "dance-dance-dance",
      name: "Dance dance dance",
    },
    {
      alias: "playlists-you-follow",
      name: "Playlists You Follow",
    },
  ];

  // Event handlers
  const changePlSelected = (plSelected: string) => {
    if (plSelected) setPlaylistSelected(plSelected);
  };
  return (
    <div className="mt-[12px] flex flex-col gap-[6px]">
      <div className="font-bold py-[4px] pl-[16px] pr-[7px] flex items-center justify-between">
        Playlists
        <i className="fa-solid fa-ellipsis"></i>
      </div>
      <div className="flex gap-[16px] px-[16px]">
        <i className="fa-regular fa-folder cursor-pointer text-[#1DB954] hover:text-[#1DB954]"></i>
        <i className="fa-solid fa-list cursor-pointer hover:text-[#1DB954]"></i>
      </div>
      <ul
        className="flex flex-col gap-[8px] max-h-[200px] overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {playlists.map((pl) => (
          <li
            key={pl.alias}
            className={`py-[4px] px-[16px] hover:bg-[#262626] rounded-[5px] cursor-pointer ${
              pl.alias === playlistSelected && "bg-[#262626]"
            }`}
            onClick={() => changePlSelected(pl.alias)}
          >
            {pl.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
