/* eslint-disable @next/next/no-img-element */
"use client";

import { Singer } from "@/app/interfaces/Singer";
import { useEffect, useState } from "react";
import { displayTimeSong } from "@/app/utils/commonFunctions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Song } from "@/app/interfaces/Song";
import { selectLikedSongsPl } from "@/app/stores/auth";
import { useAppSelector } from "@/app/stores/hooks";
import useAPI from "@/app/utils/fetchApi";

interface PopularSectionProps {
  singer: Singer | null;
}

interface ContextMenuPositionType {
  mouseX: number;
  mouseY: number;
}

export default function PopularSection({ singer }: PopularSectionProps) {
  const likedSongs = useAppSelector(selectLikedSongsPl);

  const [contextMenu, setContextMenu] =
    useState<ContextMenuPositionType | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleSaveToYourLikedSongs = async (song: Song) => {
    const likedSongsPlId = likedSongs?.item._id;
    const urlAddSongToPl = `playlists/${likedSongsPlId}/add-song/${song._id}`;
    const response = await useAPI.put(urlAddSongToPl);
    if (response) {
    } else {
    }
    handleClose();
  };

  return (
    <div className="px-[20px]">
      <h2 className="font-bold text-[30px]">Popular</h2>
      {singer?.songs.length && (
        <ul className="list-songs-popular">
          {singer.songs.map((song, index) => (
            <li
              className="song"
              key={song._id}
              onContextMenu={handleContextMenu}
            >
              <div className="index">
                <span className="index-value">{index + 1}</span>
                <PlayArrowIcon className="play"></PlayArrowIcon>
              </div>
              <img className="thumb" src={song.thumb} alt={song.name} />
              <div className="name">{song.name}</div>
              <div className="count-views">5,333,333</div>
              <div className="time">{displayTimeSong(song.duration)}</div>
              <div className="add-action">
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
              </div>
              <div className="more-options">
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleClose} className="flex gap-[5px]">
                  <AddIcon />
                  Add to playlist
                </MenuItem>
                <MenuItem
                  onClick={() => handleSaveToYourLikedSongs(song)}
                  className="flex gap-[5px]"
                >
                  <AddCircleOutlineIcon />
                  Save to your Liked Songs
                </MenuItem>
              </Menu>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
