"use client";

import { Chip, IconButton } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import YourLibrary from "./YourLibrary";

export default function LeftNav() {
  return (
    <div className="left-nav">
      <div className="header">
        <div className="title">
          <LibraryMusicIcon fontSize="large"></LibraryMusicIcon>
          Your Library
        </div>
        <div>
          <IconButton>
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
