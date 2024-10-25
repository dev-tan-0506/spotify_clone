"use client";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
      <div className="flex justify-between">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton sx={{ "padding-right": 0 }}>
          <span className="pr-[2px]">Recently added</span>
          <MenuIcon />
        </IconButton>
      </div>
      <ul
        className="flex flex-col gap-[8px] max-h-[200px] overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {playlists.map((pl) => (
          <li
            key={pl.alias}
            className={`py-[4px] hover:bg-[#262626] rounded-[5px] cursor-pointer ${
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
