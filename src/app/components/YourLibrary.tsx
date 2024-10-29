"use client";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserLibrary } from "../interfaces/User";
import { selectUserLoginInfo } from "../stores/auth";
import { useAppSelector } from "../stores/hooks";

export default function YourLibrary() {
  const [playlistSelected, setPlaylistSelected] = useState<string>("");
  const user = useAppSelector(selectUserLoginInfo);

  const [yourLibrary, setYourLibrary] = useState<UserLibrary[]>({});
  // Event handlers
  const changePlSelected = (plSelected: string) => {
    if (plSelected) setPlaylistSelected(plSelected);
  };

  const handleGetYourLibrary = async () => {
    try {
    } catch (error) {}
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
