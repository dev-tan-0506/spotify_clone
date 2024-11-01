"use client";

import { Chip, IconButton } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import YourLibrary from "./YourLibrary";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { selectPlaylistsInUserLibrary } from "../stores/auth";
import useAPI from "../utils/fetchApi";
import { getYourLibrary } from "../stores/asyncThunks/auth";
import { openToastMessage } from "../stores/toastMessage";

export default function LeftNav() {
  const userPlaylists = useAppSelector(selectPlaylistsInUserLibrary);
  const dispatch = useAppDispatch();

  const handleAddNewPlaylist = async () => {
    const listMyPlaylist = userPlaylists.filter((item) =>
      item.item.name.includes("My Playlist")
    );
    const urlAddNewPlaylist = `playlists`;
    const payload = {
      name: `My Playlists #${listMyPlaylist.length + 1}`,
    };
    const response = await useAPI.post(urlAddNewPlaylist, payload);
    if (response) {
      dispatch(getYourLibrary());
      dispatch(openToastMessage("Add new playlist is successfully."));
    } else {
      dispatch(openToastMessage("Add new playlist is failed."));
    }
  };
  return (
    <div className="left-nav">
      <div className="header">
        <div className="title">
          <LibraryMusicIcon fontSize="large"></LibraryMusicIcon>
          Your Library
        </div>
        <div>
          <IconButton onClick={handleAddNewPlaylist}>
            <AddIcon className="icon-action" />
          </IconButton>
          <IconButton>
            <ArrowForwardIcon className="icon-action" />
          </IconButton>
        </div>
      </div>
      <div className="list-type">
        <Chip label="Playlists" color="primary" />
      </div>
      <YourLibrary></YourLibrary>
    </div>
  );
}
