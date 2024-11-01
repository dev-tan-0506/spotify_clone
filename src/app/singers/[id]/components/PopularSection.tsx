/* eslint-disable @next/next/no-img-element */
"use client";

import { Singer } from "@/app/interfaces/Singer";
import { useState } from "react";
import { displayTimeSong } from "@/app/utils/commonFunctions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Song } from "@/app/interfaces/Song";
import { selectLikedSongsPl } from "@/app/stores/auth";
import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import useAPI from "@/app/utils/fetchApi";
import { openToastMessage } from "@/app/stores/toastMessage";
import { getYourLibrary } from "@/app/stores/asyncThunks/auth";
import { Playlist } from "@/app/interfaces/Playlist";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface PopularSectionProps {
  singer: Singer | null;
}

interface ContextMenuPositionType {
  mouseX: number;
  mouseY: number;
  song?: Song;
}

export default function PopularSection({ singer }: PopularSectionProps) {
  const likedSongs = useAppSelector(selectLikedSongsPl);
  const dispatch = useAppDispatch();
  const [contextMenu, setContextMenu] =
    useState<ContextMenuPositionType | null>(null);
  const [songSelected, setSongSelected] = useState<Song>({} as Song);

  const handleContextMenu = (event: React.MouseEvent, song: Song) => {
    if (!song) {
      return;
    }

    event.preventDefault();

    setSongSelected(song);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            song,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
    setTimeout(() => {
      setSongSelected({} as Song);
    }, 100);
  };

  const handleSaveToYourLikedSongs = async (song?: Song) => {
    if (!song || !likedSongs) {
      return;
    }
    const likedSongsPlId = likedSongs?.item._id;
    const urlAddSongToPl = `playlists/${likedSongsPlId}/add-song/${song._id}`;
    const response = await useAPI.put(urlAddSongToPl);
    if (response) {
      dispatch(
        openToastMessage(`Add ${song?.name} to Liked Songs successfully.`)
      );
      dispatch(getYourLibrary());
    } else {
      dispatch(openToastMessage(`Add ${song?.name} to Liked Songs failed.`));
    }
    handleClose();
  };

  const handleRemoveFromYourLikedSongs = async (song?: Song) => {
    if (!song || !likedSongs) {
      return;
    }
    const likedSongsPlId = likedSongs?.item._id;
    const urlRemoveSongToPl = `playlists/${likedSongsPlId}/remove-song/${song._id}`;
    const response = await useAPI.put(urlRemoveSongToPl);
    if (response) {
      dispatch(
        openToastMessage(`Remove ${song?.name} from Liked Songs successfully.`)
      );
      dispatch(getYourLibrary());
    } else {
      dispatch(
        openToastMessage(`Remove ${song?.name} from Liked Songs failed.`)
      );
    }
    handleClose();
  };

  const checkSongIsExistsInLikedSongs = (song?: Song) => {
    if (!song) {
      return false;
    }

    const songsInLikedSongs = (likedSongs?.item as Playlist).songs as string[];
    return songsInLikedSongs.includes(song._id);
  };

  return (
    <div className="px-[20px]" onContextMenu={(e) => e.preventDefault()}>
      <h2 className="font-bold text-[30px]">Popular</h2>
      {singer?.songs.length && (
        <ul className="list-songs-popular">
          {singer.songs.map((song, index) => (
            <li
              className={`song ${songSelected._id == song._id && "active"}`}
              key={song._id}
              onContextMenu={(event) => handleContextMenu(event, song)}
            >
              <div className="index">
                <span className="index-value">{index + 1}</span>
                <PlayArrowIcon className="play"></PlayArrowIcon>
              </div>
              <img className="thumb" src={song.thumb} alt={song.name} />
              <div className="name">{song.name}</div>
              <div className="count-views">5,333,333</div>
              <div className="time">{displayTimeSong(song.duration)}</div>
              {checkSongIsExistsInLikedSongs(song) ? (
                <div className="add-action show">
                  <CheckCircleIcon sx={{ color: "#1ed760" }} />
                </div>
              ) : (
                <div className="add-action">
                  <AddCircleOutlineIcon />
                </div>
              )}

              <div
                className="more-options"
                onClick={(event) => handleContextMenu(event, song)}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </li>
          ))}
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
            <MenuItem className="flex gap-[5px]">
              <AddIcon />
              Add to playlist
            </MenuItem>
            {checkSongIsExistsInLikedSongs(songSelected) ? (
              <MenuItem
                onClick={() => handleRemoveFromYourLikedSongs(songSelected)}
                className="flex gap-[5px]"
              >
                <CheckCircleIcon sx={{ color: "#1ed760" }} />
                Remove from your Liked Songs
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => handleSaveToYourLikedSongs(songSelected)}
                className="flex gap-[5px]"
              >
                <AddCircleOutlineIcon />
                Save to your Liked Songs
              </MenuItem>
            )}
          </Menu>
        </ul>
      )}
    </div>
  );
}
